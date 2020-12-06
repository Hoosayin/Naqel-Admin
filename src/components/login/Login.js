import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { loginAdministrator } from "../administrators/AdministratorFunctions";
import Preloader from "../../controls/Preloader";
import jwt_decode from "jwt-decode";

import {
    LoginCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            PhoneNumberOrUsername: "",
            Password: "",

            ValidPhoneNumberOrUsername: false,
            ValidPassword: false,

            ValidForm: false,
            LoggedInAsAdministrator: false,
            LoginError: null,

            Errors: {
                PhoneNumberOrUsername: "",
                Password: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.Token) {
            let token = jwt_decode(sessionStorage.Token);

            if (token.AdministratorID) {
                this.setState({
                    LoggedInAsAdministrator: true
                });
            }
            else {
                this.setState({
                    LoggedInAsAdministrator: false
                });
            }
        }
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value }, () => {
            this.validateField(name, value)
        });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidPhoneNumberOrUsername = this.state.ValidPhoneNumberOrUsername;
        let ValidPassword = this.state.ValidPassword;

        switch (field) {
            case "PhoneNumberOrUsername":
                ValidPhoneNumberOrUsername = value !== "";
                Errors.PhoneNumberOrUsername = ValidPhoneNumberOrUsername ? "" : Dictionary.PhoneNumberOrUsernameError;
                break;
            case "Password":
                ValidPassword = (value != "");
                Errors.Password = ValidPassword ? "" : Dictionary.PasswordError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPhoneNumberOrUsername: ValidPhoneNumberOrUsername,
            ValidPassword: ValidPassword
        }, () => {
            this.setState({
                ValidForm: this.state.ValidPhoneNumberOrUsername &&
                    this.state.ValidPassword
            });
        });
    }

    onSubmit = async event => {
        await event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            Preloader: <Preloader />
        });

        const user = {
            PhoneNumberOrUsername: this.state.PhoneNumberOrUsername,
            Password: this.state.Password,
            SignInAs: "Administrator",
        };

        await loginAdministrator(user).then(response => {
            if (response.Message === "Login successful.") {
                sessionStorage.setItem("Token", response.Token);

                this.setState({
                    LoggedInAsAdministrator: true,
                    Preloader: null
                });
            }
            else {
                this.setState({
                    LoginError: <div>
                        <label className="control-label text-danger">{response.Message}</label>
                        <br />
                    </div>,
                    Preloader: null,
                });
            }
        });
    }

    render() {
        if (this.state.LoggedInAsAdministrator) {
            return <Redirect to={"/administrators"} />;
        }
        else {
            return <div dir={GetDirection()}>
                <div className="middle" style={LoginCardBack}>
                    <div className="theme-default animated fadeIn" style={Card} >
                        <div style={CardChild}>
                            <img src="./images/lock.svg" alt="Login.png" height="60" />
                            <div className="type-h3" style={CardTitle}>{Dictionary.SignIn}</div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label htmlFor="PhoneNumber" class="control-label">{Dictionary.PhoneNumberOrUsername}</label>
                                    <input type="text" className="form-control" name="PhoneNumberOrUsername" autocomplete="off" 
                                    placeholder="+966501234567 | someone"
                                    value={this.state.PhoneNumberOrUsername} onChange={this.onChange} />
                                    <span class="text-danger">{this.state.Errors.PhoneNumberOrUsername}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Password" className="control-label">{Dictionary.Password}</label>
                                    <input type="password" className="form-control" name="Password" placeholder="Password"
                                        value={this.state.Password} onChange={this.onChange} />
                                    <span className="text-danger">{this.state.Errors.Password}</span>
                                </div>
                                <div className="form-group">
                                    {this.state.LoginError}
                                    <label className="control-label"><Link to="/forgotPassword">{Dictionary.ForgotPassword}</Link></label><br />
                                    <label className="control-label">{Dictionary.NoAccount} <span><Link to="/register">{Dictionary.RegisterNow}</Link></span></label>
                                </div>
                                <div>
                                    <input type="submit" value={Dictionary.SignIn} className="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.Preloader}
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
        SignIn: "تسجيل الدخول",
        Password: "كلمه السر",
        SignInAs: "تسجيل الدخول باسم",
        Driver: "سائق",
        Trader: "التاجر",
        Broker: "وسيط",
        TCResponsible: "مسؤول التعاون الفني",
        Administrator: "مدير",
        ForgotPassword: "هل نسيت كلمة المرور؟",
        NoAccount: "لا حساب؟",
        RegisterNow: "سجل الان",
        PhoneNumberOrUsername: "رقم الهاتف أو اسم المستخدم",
        PhoneNumberOrUsernameError: ".مطلوب رقم الهاتف أو اسم المستخدم",
        PasswordError: ".كلمة المرور مطلوبة"
    };
}
else {
    Dictionary = {
        SignIn: "Sign In",
        Password: "Password",
        SignInAs: "Sign In As",
        Driver: "Driver",
        Trader: "Trader",
        Broker: "Broker",
        TCResponsible: "TC Responsible",
        Administrator: "Administrator",
        ForgotPassword: "Forgot Password?",
        NoAccount: "No account?",
        RegisterNow: "Register now",
        PhoneNumberOrUsername: "Phone Number or Username",
        PhoneNumberOrUsernameError: "Phone number or username is required.",
        PasswordError: "Password is required.",
    };
}

export default Login;