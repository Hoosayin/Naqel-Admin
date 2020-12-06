import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import FirebaseApp from "../../res/FirebaseApp";
import Preloader from "../../controls/Preloader";
import PhoneConfirmationDialog from "../../containers/phoneConfirmationDialog/PhoneConfirmationDialog";
import { registerAdministrator } from "../administrators/AdministratorFunctions";

import {
    RegisterCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            Username: "",
            PhoneNumber: "",
            Password: "",
            ConfirmPassword: "",
            RegisterAs: "Administrator",

            PasswordsMatched: false,
            UsernameOrEmailTaken: false,
            ValidPhoneNumber: false,
            ValidPassword: false,
            ValidUsername: false,

            ConfirmationResult: null,
            PhoneCodeVerified: false,

            ValidForm: false,
            Agreed: false,
            ShowPreloader: false,

            Errors: {
                Username: "",
                PhoneNumber: "",
                Password: "",
                ConfirmPassword: "",
                Agreed: "",
                Form: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
            "size": "invisible",
            "callback": response => {
            }
        });
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let {
            ValidUsername,
            ValidPhoneNumber,
            ValidPassword,
            PasswordsMatched,
            Agreed,
            Errors
        } = this.state;

        switch (field) {
            case "Username":
                ValidUsername = (value !== "");
                Errors.Username = ValidUsername ? "" : Dictionary.UsernameError1;

                if (!ValidUsername) {
                    break;
                }

                ValidUsername = (value.match(/^[a-z0-9]+$/i));
                Errors.Username = ValidUsername ? "" : Dictionary.UsernameError2;
                break;
            case "PhoneNumber":
                ValidPhoneNumber = value !== "";
                Errors.PhoneNumber = ValidPhoneNumber ? "" : Dictionary.PhoneNumberError1;

                if (!ValidPhoneNumber) {
                    break;
                }

                ValidPhoneNumber = value.match(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/);
                Errors.PhoneNumber = ValidPhoneNumber ? "" : Dictionary.PhoneNumberError2;
                break;
            case "Password":
                ValidPassword = value != "";
                Errors.Password = ValidPassword ? "" : Dictionary.PasswordError1;

                if (!ValidPassword) {
                    break;
                }

                ValidPassword = value.length >= 6;
                Errors.Password = ValidPassword ? "" : Dictionary.PasswordError2;
                break;
            case "ConfirmPassword":
                PasswordsMatched = this.state.Password === value;
                Errors.ConfirmPassword = PasswordsMatched ? "" : Dictionary.ConfirmPasswordError;
                break;
            case "IsAgree":
                Agreed = this.refs.agreementCheckBox.checked;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidUsername: ValidUsername,
            ValidPhoneNumber: ValidPhoneNumber,
            ValidPassword: ValidPassword,
            PasswordsMatched: PasswordsMatched,
            Agreed: Agreed,
        }, () => {
            this.setState({
                ValidForm: ValidPhoneNumber &&
                    ValidPassword &&
                    PasswordsMatched &&
                    Agreed &&
                    ValidUsername
            });
        });
    }

    handleResponse = (response) => {
        if (response.Message === "Token received.") {
            sessionStorage.setItem("NewUserToken", response.Token);
            this.props.history.push("/setupAdministratorAccount");
        }
        else {
            let {
                Errors
            } = this.state;

            Errors.Form = response.Message;

            this.setState({
                Errors: Errors
            });
        }
    };

    onSubmit = async event => {
        if (event) {
            event.preventDefault();
        }

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        if (this.state.PhoneCodeVerified) {
            const newUser = {
                Username: this.state.Username,
                Password: this.state.Password,
                PhoneNumber: this.state.PhoneNumber,
                RegisterAs: "Administrator",
            };

            await registerAdministrator(newUser).then(response => {
                this.setState({
                    ShowPreloader: false
                });

                this.handleResponse(response);
            });
        }
        else {
            const appVerifier = window.recaptchaVerifier;

            FirebaseApp.auth().languageCode = "en";
            FirebaseApp.auth().signInWithPhoneNumber(this.state.PhoneNumber, appVerifier).then(confirmationResult => {
                this.setState({
                    ShowPreloader: false,
                    ConfirmationResult: confirmationResult
                });

                this.SendCodeButton.click();
            }).catch(error => {
                let {
                    Errors
                } = this.state;

                Errors.Form = error.message;

                this.setState({
                    ShowPreloader: false,
                    Errors: Errors
                });
            });
        }
    }

    render() {
        const {
            Username,
            PhoneNumber,
            Password,
            ConfirmPassword,
            ValidForm,
            ShowPreloader,
            Errors,
        } = this.state;

        return <div dir={GetDirection()}>
            <div class="middle" style={RegisterCardBack}>
                <div class="theme-default animated fadeIn" style={Card}>
                    <div style={CardChild}>
                        <img src="./images/spaceship.svg" alt="signup.png" height="60" />
                        <div class="type-h3" style={CardTitle}>{Dictionary.SignUp}</div>
                        <br />
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label htmlFor="Username" class="control-label">{Dictionary.Username}</label>
                                <span className="text-danger m-l-xxxs">*</span>
                                <input htmlFor="Username" type="text" name="Username" class="form-control" autocomplete="off"
                                    value={Username} onChange={this.onChange} required />
                                <span class="text-danger">{Errors.Username}</span>
                            </div>
                            <div class="form-group">
                                <label htmlFor="PhoneNumber" class="control-label">{Dictionary.PhoneNumber}</label>
                                <span className="text-danger m-l-xxxs">*</span>
                                <input type="text" className="form-control" name="PhoneNumber" autocomplete="off"
                                    placeholder="+966501234567" value={PhoneNumber} onChange={this.onChange} />
                                <span class="text-danger">{Errors.PhoneNumber}</span>
                            </div>
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
                            <div>
                                <div class="checkbox">
                                    <label class="control-label">
                                        <input ref="agreementCheckBox" type="checkbox" name="IsAgree" value="" onChange={this.onChange}></input>
                                        <span>{Dictionary.AgreeWithOur} </span>
                                        <span>
                                            <Link data-toggle="modal" data-target="#terms">{Dictionary.TermsAndConditions}</Link>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                {Errors.Form ? <div>
                                    <label class="text-danger">{Errors.Form}</label>
                                    <br />
                                </div> : null}
                                <label class="control-label">{Dictionary.HaveAnAccount} <span><Link to="/login">{Dictionary.SignInNow}</Link></span></label>
                            </div>

                            <input type="submit" value={Dictionary.Next} class="btn btn-primary" disabled={!ValidForm} />
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal" id="terms" tabindex="-1" role="dialog" aria-labelledby="modal-sample-label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="modal-sample-label">{Dictionary.TermsOfUse}</h4>
                        </div>
                        <div class="modal-body text-justify">{Dictionary.TermsAndConditionsDetails}</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" data-dismiss="modal">{Dictionary.OK}</button>
                        </div>
                    </div>
                </div>
            </div>

            <button
                style={{ display: "none" }}
                data-toggle="modal"
                data-target="#phone-confirmation-dialog"
                ref={sendCodeButton => this.SendCodeButton = sendCodeButton}></button>

            <PhoneConfirmationDialog ConfirmationResult={this.state.ConfirmationResult}
                PhoneNumber={this.state.PhoneNumber}
                OnOK={phoneCodeVerified => {
                    if (phoneCodeVerified) {
                        this.setState({
                            PhoneCodeVerified: true
                        });

                        this.onSubmit();
                    }
                    else {
                        let {
                            Errors
                        } = this.state;

                        Errors.Form = Dictionary.CodeError;

                        this.setState({
                            ValidForm: false,
                            Errors: Errors
                        });
                    }
                }} />

            <div id="recaptcha" />

            {ShowPreloader ? <Preloader /> : null}
        </div>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        SignUp: "سجل",
        Username: "اسم المستخدم",
        PhoneNumber: "رقم الهاتف",
        Password: "كلمه السر",
        ConfirmPassword: "تأكيد كلمة المرور",
        RegisterAs: "تسجيل باسم",
        Driver: "سائق",
        Trader: "التاجر",
        Broker: "وسيط",
        TCResponsible: "مسؤول التعاون الفني",
        Administrator: "مدير",
        AgreeWithOur: "نتفق مع",
        TermsAndConditions: "الأحكام والشروط",
        HaveAnAccount: "هل لديك حساب؟",
        SignInNow: "قم بتسجيل دخولك الآن!",
        Next: "التالى",
        TermsOfUse: "تعليمات الاستخدام",
        TermsAndConditionsDetails: ".خصوصيتك مهمة بالنسبة لنا. يصف بيان خصوصية النقل أنواع البيانات التي نجمعها منك ، وكيفية استخدامنا لبياناتك ، والأسس القانونية التي يتعين علينا معالجتها لبياناتك. يصف بيان الخصوصية أيضًا كيف يستخدم النقل المحتوى الخاص بك ، وهي المعلومات التي قدمتها للنقل عبر الخدمات. عندما تستند المعالجة إلى الموافقة وإلى الحد الذي يسمح به القانون ، بالموافقة على هذه الشروط ، فإنك توافق على جمع ونقل واستخدام والكشف عن المحتوى والبيانات الخاصة بك كما هو موضح في بيان الخصوصية. في بعض الحالات ، سنقدم إشعارًا منفصلاً ونطلب موافقتك على النحو المشار إليه في بيان الخصوصية",
        OK: "حسنا",
        UsernameError1: ".اسم المستخدم مطلوب",
        UsernameError2: ".إسم المستخدم غير صحيح",
        PhoneNumberError1: ".رقم الهاتف مطلوب",
        PhoneNumberError2: ".رقم الهاتف غير صالح",
        CodeError: ".رمز التأكيد غير صالح",
        PasswordError1: ".كلمة المرور مطلوبة",
        PasswordError2: "كلمة المرور قصيرة جدا.",
        ConfirmPasswordError: "كلمتا المرور غير متطابقتين.",
        EmailUsernameError: ".اسم المستخدم أو البريد الإلكتروني مأخوذ بالفعل",
        TermsError: "يجب أن توافق على الشروط والأحكام الخاصة بنا.",
    };
}
else {
    Dictionary = {
        SignUp: "Sign Up",
        Username: "Username",
        PhoneNumber: "Phone Number",
        Password: "Password",
        ConfirmPassword: "Confirm Password",
        RegisterAs: "Register As",
        Driver: "Driver",
        Trader: "Trader",
        Broker: "Broker",
        TCResponsible: "TC Responsible",
        Administrator: "Administrator",
        AgreeWithOur: "Agree with our",
        TermsAndConditions: "Terms and Conditions",
        HaveAnAccount: "Have an account?",
        SignInNow: "Sign In Now!",
        Next: "Next",
        TermsOfUse: "Terms of Use",
        TermsAndConditionsDetails: "Your privacy is important to us. Naqel's Privacy Statement describes the types of data we collect from you, how we use your Data, and the legal bases we have to process your Data. The Privacy Statement also describes how Naqel uses your content, which is information submitted by you to Naqel via the Services. Where processing is based on consent and to the extent permitted by law, by agreeing to these Terms, you consent to Naqel’s collection, use and disclosure of your content and data as described in the privacy statement. In some cases, we will provide separate notice and request your consent as referenced in the privacy statement.",
        OK: "OK",
        UsernameError1: "Username is required.",
        UsernameError2: "Username is invalid.",
        PhoneNumberError1: "Phone number is required.",
        PhoneNumberError2: "Phone number is invalid.",
        CodeError: "Confirmation code is invalid.",
        PasswordError1: "Password is required.",
        PasswordError2: "Password is too short.",
        ConfirmPasswordError: "Passwords did not match.",
        EmailUsernameError: "Username or email is already taken.",
        TermsError: "You must agree to our terms and conditions.",
    };
}

export default Register;