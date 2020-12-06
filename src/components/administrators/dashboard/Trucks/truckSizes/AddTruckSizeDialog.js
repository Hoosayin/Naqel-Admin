import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addTruckSize } from "../../../AdministratorFunctions";

class AddTruckSizeDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TruckSize: "",
            ValidTruckSize: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                TruckSize: ""
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
            ValidTruckSize
        } = this.state;

        switch (field) {
            case "TruckSize":
                ValidTruckSize = (value !== "");
                Errors.TruckSize = ValidTruckSize ? "" : Dictionary.TruckSizeError1;

                if (!ValidTruckSize) {
                    break;
                }

                ValidTruckSize = (value >= 700);
                Errors.TruckSize = ValidTruckSize ? "" : Dictionary.TruckSizeError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidTruckSize: ValidTruckSize,
        }, () => {
                this.setState({
                    ValidForm: ValidTruckSize
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

        const newTruckSize = {
            Token: sessionStorage.Token,
            TruckSize: this.state.TruckSize
        };

        await addTruckSize(newTruckSize).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Truck size is added.") {
                this.cancelButton.click();
                this.props.OnOK();

                this.setState({
                    TruckSize: "",
                    ValidTruckSize: false,
        
                    ValidForm: false,
                    ShowPreloader: false,
        
                    Errors: {
                        TruckSize: ""
                    }
                });
            }
        });
    }

    render() {
        const {
            TruckSize,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-truck-size-dialog`}
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
                                                <div className="type-h3 color-default p-t-n">{Dictionary.AddNewTruckSize}</div>
                                                <div class="form-group">
                                                    <label className="control-label">{Dictionary.TruckSize}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="TruckSize" className="form-control" autoComplete="off"
                                                        value={TruckSize} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.TruckSize}</span>
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
        AddNewTruckSize: "إضافة حجم شاحنة جديد",
        TruckSize: "(حجم الشاحنة (كغالعلامة",
        Add: "أضف",
        TruckSizeError1: ".حجم الشاحنة مطلوب",
        TruckSizeError2: ".يجب أن يكون حجم الشاحنة أكبر من 699 كجم"
    };
}
else {
    Dictionary = {
        AddNewTruckSize: "Add New Truck Size",
        TruckSize: "Truck Size (KG)",
        Add: "Add",
        TruckSizeError1: "Truck size is required.",
        TruckSizeError2: "Truck size must be greater than 699 KG."
    };
}

export default AddTruckSizeDialog;