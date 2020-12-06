import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addPermitType } from "../../../AdministratorFunctions";

class AddPermitTypeDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PermitType: "",
            ValidPermitType: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                PermitType: ""
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
            ValidPermitType
        } = this.state;

        switch (field) {
            case "PermitType":
                ValidPermitType = (value !== "");
                Errors.PermitType = ValidPermitType ? "" : Dictionary.PermitTypeError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPermitType: ValidPermitType,
        }, () => {
                this.setState({
                    ValidForm: ValidPermitType
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

        const newPermitType = {
            Token: sessionStorage.Token,
            PermitType: this.state.PermitType
        };

        await addPermitType(newPermitType).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Permit type is added.") {
                this.cancelButton.click();
                this.props.OnOK();

                this.setState({
                    PermitType: "",
                    ValidPermitType: false,
        
                    ValidForm: false,
                    ShowPreloader: false,
        
                    Errors: {
                        PermitType: ""
                    }
                });
            }
        });
    }

    render() {
        const {
            PermitType,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-permit-type-dialog`}
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
                                                <div className="type-h3 color-default p-t-n p-b-xxxs">{Dictionary.AddNewPermitType}</div>
                                                <div class="form-group">
                                                    <label className="control-label">{Dictionary.PermitType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="PermitType" className="form-control" autoComplete="off"
                                                        value={PermitType} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.PermitType}</span>
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
        AddNewPermitType: "إضافة نوع جديد من التصريح",
        PermitType: "نوع التصريح",
        Add: "أضف",
        PermitTypeError1: ".نوع التصريح مطلوب",
    };
}
else {
    Dictionary = {
        AddNewPermitType: "Add New Permit Type",
        PermitType: "Permit Type",
        Add: "Add",
        PermitTypeError1: "Permit type is required.",
    };
}

export default AddPermitTypeDialog;