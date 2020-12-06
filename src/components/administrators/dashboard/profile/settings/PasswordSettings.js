import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { validatePassword, passwordSettings } from "../../../AdministratorFunctions";

class PasswordSettings extends Component {
    constructor() {
        super();

        this.state = {
            CurrentPassword: "",
            NewPassword: "",
            ConfirmPassword: "",

            ValidCurrentPassword: false,
            ValidNewPassword: false,
            ValidConfirmPassword: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                CurrentPassword: "",
                NewPassword: "",
                ConfirmPassword: "",
            },
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

    async validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidCurrentPassword = this.state.ValidCurrentPassword;
        let ValidNewPassword = this.state.ValidNewPassword;
        let ValidConfirmPassword = this.state.ValidConfirmPassword;

        switch (field) {
            case "CurrentPassword":
                ValidCurrentPassword = (value !== "");
                Errors.CurrentPassword = ValidCurrentPassword ? "" : Dictionary.CurrentPasswordError;
                break;
            case "NewPassword":
                ValidNewPassword = value.length >= 6;
                Errors.NewPassword = ValidNewPassword ? "" : Dictionary.NewPasswordError;

                if (Errors.NewPassword !== "") {
                    break;
                }

                ValidConfirmPassword = value === this.state.ConfirmPassword;
                Errors.ConfirmPassword = ValidConfirmPassword ? "" : Dictionary.ConfirmPasswordError;
                break;
            case "ConfirmPassword":
                ValidConfirmPassword = value === this.state.NewPassword;
                Errors.ConfirmPassword = ValidConfirmPassword ? "" : Dictionary.ConfirmPasswordError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidCurrentPassword: ValidCurrentPassword,
            ValidNewPassword: ValidNewPassword,
            ValidConfirmPassword: ValidConfirmPassword,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidCurrentPassword &&
                    this.state.ValidNewPassword &&
                    this.state.ValidConfirmPassword
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        let passwordPackage = {
            Token: sessionStorage.Token,
            Password: this.state.CurrentPassword
        };

        await validatePassword(passwordPackage).then(async response => {
            if (response.Message === "Invalid password.") {
                let errors = this.state.Errors;
                errors.CurrentPassword = response.Message;

                this.setState({
                    Errors: errors,
                    ValidForm: false,
                });
            }
            else {
                this.setState({
                    ShowPreloader: true
                });

                const updatedAdministrator = {
                    Token: sessionStorage.Token,
                    Password: this.state.NewPassword
                };

                await passwordSettings(updatedAdministrator).then(response => {
                    this.setState({
                        ShowPreloader: false,
                        CurrentPassword: "",
                        NewPassword: "",
                        ConfirmPassword: "",
                        ValidForm: false,
                    });

                    if (response.Message === "Administrator is updated.") {
                        this.props.OnSettingsSaved();
                    }
                });
            }
        });
    }

    render() {
        const {
            CurrentPassword,
            NewPassword,
            ConfirmPassword,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF" }}>{Dictionary.ChangePassword}</div>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="entity-list entity-list-expandable">
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-key"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="password" name="CurrentPassword" className="form-control" autoComplete="off"
                                    value={CurrentPassword} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.ChangePassword}</div>
                            <div className="text-danger">{Errors.CurrentPassword}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-key"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="password" name="NewPassword" className="form-control" autoComplete="off"
                                    value={NewPassword} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.NewPassword}</div>
                            <div className="text-danger">{Errors.NewPassword}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-key"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="password" name="ConfirmPassword" className="form-control" autoComplete="off"
                                    value={ConfirmPassword} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.ConfirmPassword}</div>
                            <div className="text-danger">{Errors.ConfirmPassword}</div>
                        </div>
                    </div>
                    <div className="entity-list-item active">
                        <div className="item-icon">
                            <span className="fas fa-save"></span>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.SaveChanges}</div>
                            <div className="content-text-secondary">{Dictionary.Undone}</div>
                        </div>
                        <div className="item-content-expanded">
                            <input type="submit" value={Dictionary.Save} className="btn btn-primary" disabled={!ValidForm} />
                        </div>
                    </div>
                </div>
            </form>

            {ShowPreloader ? <Preloader /> : null}
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
        ChangePassword: "غير كلمة السر",
        CurrentPassword: "كلمة المرور الحالي",
        NewPassword: "كلمة سر جديدة",
        ConfirmPassword: "تأكيد كلمة المرور",
        SaveChanges: "حفظ التغييرات؟",
        Undone: ".هذا لا يمكن التراجع عنها",
        Save: "حفظ",  
        CurrentPasswordError: ".كلمة المرور الحالية مطلوبة",
        NewPasswordError: ".كلمة المرور قصيرة جدا",
        ConfirmPasswordError: ".كلمتا المرور غير متطابقتين",
    };
}
else {
    Dictionary = {
        ChangePassword: "Change Password",
        CurrentPassword: "Current Password",
        NewPassword: "New Password",
        ConfirmPassword: "Confirm Password",
        SaveChanges: "Save Changes?",
        Undone: "This cannot be undone.",
        Save: "Save",  
        CurrentPasswordError: "Current password is required.",
        NewPasswordError: "Password is too short.",
        ConfirmPasswordError: "Passwords did not match.",
    };
}

export default PasswordSettings;