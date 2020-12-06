import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Preloader from "../../controls/Preloader";
import { setupAdministratorAccount, validateEmail } from "../administrators/AdministratorFunctions";
import { vlaidateEmail } from "../shared/UserFunctions";

import {
    AccountSetupCardBack,
    CardLarge,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class SetupAdministratorAccount extends Component {
    constructor() {
        super();

        this.state = {
            Email: "",
            FirstName: "",
            LastName: "",
            AdministratorSecret: "",

            ValidEmail: false,
            ValidFirstName: false,
            ValidLastName: false,
            ValidAdministratorSecret: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                FirstName: "",
                LastName: "",
                AdministratorSecret: "",
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
        let Errors = this.state.Errors;
        let ValidEmail = this.state.ValidEmail;
        let ValidFirstName = this.state.ValidFirstName;
        let ValidLastName = this.state.ValidLastName;
        let ValidAdministratorSecret = this.state.ValidAdministratorSecret;

        switch (field) {
            case "Email":
                ValidEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                Errors.Email = ValidEmail ? "" : Dictionary.EmailError;
                break;
            case "FirstName":
                ValidFirstName = (value !== "");
                Errors.FirstName = ValidFirstName ? "" : Dictionary.FirstNameError1;

                if (Errors.FirstName !== "") {
                    break;
                }

                ValidFirstName = (value.match(/^[a-zA-Z ]+$/));
                Errors.FirstName = ValidFirstName ? "" : Dictionary.FirstNameError2;
                break;
            case "LastName":
                ValidLastName = (value !== "");
                Errors.LastName = ValidLastName ? "" : Dictionary.LastNameError1;

                if (Errors.LastName !== "") {
                    break;
                }

                ValidLastName = (value.match(/^[a-zA-Z ]+$/));
                Errors.LastName = ValidLastName ? "" : Dictionary.LastNameError2;
                break;
            case "AdministratorSecret":
                ValidAdministratorSecret = (value !== "");
                Errors.AdministratorSecret = ValidAdministratorSecret ? "" : Dictionary.SecretCodeError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidEmail: ValidEmail,
            ValidFirstName: ValidFirstName,
            ValidLastName: ValidLastName,
            ValidAdministratorSecret: ValidAdministratorSecret
        }, () => {
            this.setState({
                ValidForm: this.state.ValidEmail &&
                    this.state.ValidFirstName &&
                    this.state.ValidLastName &&
                    this.state.ValidAdministratorSecret
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

        await validateEmail(this.state.Email).then(async response => {
            if (response.Message === "Email is valid.") {
                const newUser = jwt_decode(sessionStorage.NewUserToken);

        const newAdministrator = {
            Username: newUser.Username,
            PhoneNumber: newUser.PhoneNumber,
            Password: newUser.Password,
            RegisterAs: newUser.RegisterAs,
            Email: this.state.Email,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            AdministratorSecret: this.state.AdministratorSecret
        }

        await setupAdministratorAccount(newAdministrator).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message == "Administrator created.") {
                sessionStorage.removeItem("NewUserToken");
                sessionStorage.setItem("IsCreatedSuccessfully", true);
                this.props.history.push("/congratulations");
            }
            else {
                let errors = this.state.Errors;
                errors.AdministratorSecret = response.Message;

                this.setState({
                    Errors: errors
                });
            }
        });
            }
            else {
                let errors = this.state.Errors;
                errors.Email = "Email is already taken.";

                this.setState({
                    Errors: errors,
                    ShowPreloader: false,
                    ValidForm: false,
                    ValidEmail: false,
                });
            }
        });
    }

    render() {
        if (!sessionStorage.NewUserToken) {
            return <Redirect to={"/register"} />;
        }
        else {
            return <section dir={GetDirection()}>
                <div class="middle" style={AccountSetupCardBack}>
                    <div class="theme-default animated fadeIn" style={CardLarge}>
                        <div style={CardChild}>
                            <img src="./images/create_account.svg" atl="create_account.png" height="60" />
                            <div class="type-h3" style={CardTitle}>{Dictionary.CreateAccount}</div>
                            <div class="type-sh3">{Dictionary.CreateAccountSubtitle}</div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="row">
                                    <div class="col-md-24">
                                        <div class="form-group">
                                            <label htmlFor="Email" class="control-label">{Dictionary.Email}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <input htmlFor="Email" type="email" name="Email" class="form-control" placeholder="someone@example.com" autocomplete="off"
                                                value={this.state.Email} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.Email}</span>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">{Dictionary.FirstName}</label>
                                            <span class="text-danger m-l-xxxs">*</span>
                                            <input type="text" className="form-control" name="FirstName" autocomplete="off"
                                                value={this.state.FirstName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.FirstName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">{Dictionary.LastName}</label>
                                            <span class="text-danger m-l-xxxs">*</span>
                                            <input type="text" className="form-control" name="LastName" autocomplete="off"
                                                value={this.state.LastName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.LastName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">{Dictionary.SecretCode}</label>
                                            <span class="text-danger m-l-xxxs">*</span>
                                            <input type="text" class="form-control" name="AdministratorSecret" autocomplete="off"
                                                value={this.state.AdministratorSecret} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.AdministratorSecret}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value={Dictionary.Create} class="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.ShowPreloader ? <Preloader /> : null}
            </section>;
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
        CreateAccount: "إنشاء حساب",
        CreateAccountSubtitle: "فقط خطوة أخرى ، لقد انتهيت!",
        Email: "البريد الإلكتروني",
        FirstName: "الاسم الاول",
        LastName: "الكنية",
        SecretCode: "الرمز السري",
        Create: "خلق",
        EmailError: ".البريد الإلكتروني غير صالح",
        FirstNameError1: ".الإسم الأول مطلوب",
        FirstNameError2: ".الاسم الأول غير صالح",
        LastNameError1: ".إسم العائلة مطلوب",
        LastNameError2: ".اسم العائلة غير صالح",
        SecretCodeError: ".الرمز السري مطلوب",
    };
}
else {
    Dictionary = {
        CreateAccount: "Create Account",
        CreateAccountSubtitle: "Just one more step, and you're done!",
        Email: "Email",
        FirstName: "First Name",
        LastName: "Last Name",
        SecretCode: "Secret Code",
        Create: "Create",
        EmailError: "Email is invalid.",
        FirstNameError1: "First name is required.",
        FirstNameError2: "First name is invalid.",
        LastNameError1: "Last name is required.",
        LastNameError2: "Last name is invalid.",
        SecretCodeError: "Secret code is required.",
    };
}

export default SetupAdministratorAccount;