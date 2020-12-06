import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addTruckType } from "../../../AdministratorFunctions";

class AddTruckTypeDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TruckType: "",
            ValidTruckType: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                TruckType: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let {
            Errors,
            ValidTruckType
        } = this.state;

        switch (field) {
            case "TruckType":
                ValidTruckType = (value !== "");
                Errors.TruckType = ValidTruckType ? "" : Dictionary.TruckTypeError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidTruckType: ValidTruckType,
        }, () => {
                this.setState({
                    ValidForm: ValidTruckType
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const newTruckType = {
            Token: sessionStorage.Token,
            TruckType: this.state.TruckType
        };

        await addTruckType(newTruckType).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Truck type is added.") {
                this.cancelButton.click();
                this.props.OnOK();

                this.setState({
                    TruckType: "",
                    ValidTruckType: false,
        
                    ValidForm: false,
                    ShowPreloader: false,
        
                    Errors: {
                        TruckType: ""
                    }
                });
            }
        });
    }

    render() {
        const {
            TruckType,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-truck-type-dialog`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n">{Dictionary.AddNewWaitingTime}</div>
                                                <div class="form-group">
                                                    <label className="control-label">{Dictionary.TruckType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="TruckType" className="form-control" autoComplete="off"
                                                        value={TruckType} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.TruckType}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Add} className="btn btn-primary" disabled={!ValidForm} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        AddNewWaitingTime: "إضافة نوع شاحنة جديدة",
        TruckType: "نوع الشاحنة",
        Add: "أضف",
        WaitingTimeError1: ".نوع الشاحنة مطلوب",
    };
}
else {
    Dictionary = {
        AddNewWaitingTime: "Add New Truck Type",
        TruckType: "Truck Type",
        Add: "Add",
        WaitingTimeError1: "Truck type is required.",
    };
}

export default AddTruckTypeDialog;