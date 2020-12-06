import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Preloader from "../../controls/Preloader";
import {recoverPassword } from "../administrators/AdministratorFunctions";

import {
    RegisterCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class RecoverPassword extends Component {
    constructor() {
        super();

        this.state = {
            Password: "",
            ConfirmPassword: "",

            ValidPassword: false,
            ValidConfirmPassword: false,

            ValidForm: false,
            Agreed: false,
            ShowPreloader: false,

            Errors: {
                Password: "",
                ConfirmPassword: "",
                Form: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let {
            ValidPassword,
            ValidConfirmPassword,
            Errors
        } = this.state;

        switch (field) {
            case "Password":
                ValidPassword = value.length >= 6;
                Errors.Password = ValidPassword ? "" : Dictionary.Password;

                if (!ValidPassword) {
                    break;
                }

                ValidConfirmPassword = value === this.state.ConfirmPassword;
                Errors.ConfirmPassword = ValidConfirmPassword ? "" : Dictionary.ConfirmPasswordError;
                break;
                break;
            case "ConfirmPassword":
                ValidConfirmPassword = value === this.state.Password;
                Errors.ConfirmPassword = ValidConfirmPassword ? "" : Dictionary.ConfirmPasswordError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPassword: ValidPassword,
            ValidConfirmPassword: ValidConfirmPassword
        }, () => {
                this.setState({
                    ValidForm: ValidPassword &&
                        ValidConfirmPassword
            });
        });
    }

    handleResponse = (response) => {
        if (response.Message === "Password is updated.") {
            sessionStorage.removeItem("ForgotPasswordPackageToken");
            this.props.history.push("/passwordRecovered");
        }
        else {
            let {
                Errors
            } = this.state;

            Errors.Form = Dictionary.FormError;

            this.setState({
                Errors: Errors
            });
        }
    };

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const ForgotPasswordPackage = JSON.parse(sessionStorage.ForgotPasswordPackageToken);

        const recoverPasswordPackage = {
            PhoneNumber: ForgotPasswordPackage.PhoneNumber,
            Password: this.state.Password,
        };

        await recoverPassword(recoverPasswordPackage).then(response => {
            this.setState({
                ShowPreloader: false
            });

            this.handleResponse(response);
        });
    }

    render() {
        if (!sessionStorage.ForgotPasswordPackageToken) {
            return <Redirect to={"/login"} />;
        }
        else {
            const {
                Password,
                ConfirmPassword,
                ValidForm,
                ShowPreloader,
                Errors,
            } = this.state;

            return <div>
            <div class="middle" style={RegisterCardBack}>
                <div class="theme-default animated fadeIn" style={Card}>
                    <div style={CardChild}>
                        <img src="./images/more.svg" alt="more.svg" height="60" />
                        <div class="type-h3" style={CardTitle}>{Dictionary.RecoverPassword}</div>
                        <br />
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label htmlFor="Password" class="control-label">{Dictionary.Password}</label>
                                <span className="text-danger m-l-xxxs">*</span>
                                <input htmlFor="Password" type="password" name="Password" class="form-control"
                                    value={Password} onChange={this.onChange} />
                                <span class="text-danger">{Errors.Password}</span>
                            </div>
                            <div class="form-group">
                                <label htmlFor="ConfirmPassword" class="control-label">{Dictionary.ConfirmPassword}</label>
                                <span className="text-danger m-l-xxxs">*</span>
                                <input htmlFor="ConfirmPassword" type="password" name="ConfirmPassword" class="form-control"
                                    value={ConfirmPassword} onChange={this.onChange} />
                                <span class="text-danger">{Errors.ConfirmPassword}</span>
                            </div>

                            {Errors.Form ?
                                <div class="form-group">
                                    <label class="text-danger">{Errors.Form}</label>
                                </div> : null}

                            <input type="submit" value={Dictionary.Submit} class="btn btn-primary" disabled={!ValidForm} />
                        </form>
                    </div>
                </div>
            </div>

            {ShowPreloader ? <Preloader /> : null}
        </div>;
        }
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        RecoverPassword: "إستعادة كلمة المرور",
        Password: "كلمه السر",
        ConfirmPassword: "تأكيد كلمة المرور",
        Submit: "إرسال",
        PasswordError: "كلمة المرور قصيرة جدا.",
        ConfirmPasswordError: "كلمتا المرور غير متطابقتين.",
        FormError: "فشل تحديث كلمة المرور. يرجى المحاولة لاحقًا!",
    };
}
else {
    Dictionary = {
        RecoverPassword: "Recover Password",
        Password: "Password",
        ConfirmPassword: "Confirm Password",
        Submit: "Submit",
        PasswordError: "Password is too short.",
        ConfirmPasswordError: "Passwords did not match.",
        FormError: "Failed to update the password. Please try later!",
    };
}

export default RecoverPassword;