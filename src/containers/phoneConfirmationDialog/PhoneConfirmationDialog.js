import React, { Component } from "react";
import Preloader from "../../controls/Preloader";

class PhoneConfirmationDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Code: "",

            ValidCode: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Code: ""
            },
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
            ValidCode
        } = this.state;

        switch (field) {
            case "Code":
                ValidCode = (value !== "");
                Errors.Code = ValidCode ? "" : Dictionary.CodeError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidCode: ValidCode
        }, () => {
            this.setState({
                ValidForm: ValidCode
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        const {
            Code,
            ValidForm
        } = this.state;

        if (!ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const {
            ConfirmationResult,
            OnOK
        } = this.props;

        ConfirmationResult.confirm(Code).then(result => {
            this.setState({
                Code: "",
                ValidCode: false,
                ValidForm: false,
                ShowPreloader: false,
                Errors: {
                    Code: ""
                },
            });

            this.cancelButton.click();
            OnOK(true);
        }).catch(error => {
            this.setState({
                Code: "",
                ValidCode: false,
                ValidForm: false,
                ShowPreloader: false,
                Errors: {
                    Code: ""
                },
            });

            this.cancelButton.click();
            OnOK(false);
        });
    }

    render() {
        const {
            Code,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        const {
            PhoneNumber
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id="phone-confirmation-dialog"
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
                                        <div className="type-h3 color-default p-t-xxs">{Dictionary.CodeConfirmation}</div>
                                        <div className="type-sh3" dir={GetDirection()}>{`${Dictionary.CodeConfirmationSubtitle} ${PhoneNumber}.`}</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-24">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.Code}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="Code" className="form-control" autoComplete="off"
                                                        value={Code} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Code}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Verify} className="btn btn-primary" disabled={!ValidForm} />
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
        CodeConfirmation: "تأكيد الرمز",
        CodeConfirmationSubtitle: "أدخل الرمز المكون من 6 أرقام الذي تم إرساله",
        Code: "الشفرة",
        Verify: "تحقق",
        CodeError: ".الرمز مطلوب",
    };
}
else {
    Dictionary = {
        CodeConfirmation: "Code Confirmation",
        CodeConfirmationSubtitle: "Enter 6-Digit Code sent on",
        Code: "Code",
        Verify: "Verify",
        CodeError: "Code is required.",
    };
}

export default PhoneConfirmationDialog;