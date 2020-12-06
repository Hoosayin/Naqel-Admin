import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";

import {
    getData,
    validateUsername,
    validateEmail,
    usernameAndEmailSettings
} from "../../../AdministratorFunctions";

class UsernameAndEmailSettings extends Component {
    constructor() {
        super();

        this.state = {
            Username: "",
            NewUsername: "",

            Email: "",
            NewEmail: "",

            ValidNewUsername: true,
            ValidNewEmail: true,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                NewUsername: "",
                NewEmail: "",
            },

            CodeConfirmation: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "Administrator"
            };

            await getData(request).then(response => {
                if (response.Message === "Administrator found.") {
                    let administrator = response.Administrator;

                    this.setState({
                        Username: administrator.Username,
                        NewUsername: administrator.Username,
                        Email: administrator.Email,
                        NewEmail: administrator.Email
                    });
                }
                else {
                    this.setState({
                        Username: "",
                        NewUsername: "",
                        Email: "",
                        NewEmail: ""
                    });
                }
            });
        }
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidNewUsername = this.state.ValidNewUsername;
        let ValidNewEmail = this.state.ValidNewEmail;

        switch (field) {
            case "NewUsername":
                ValidNewUsername = (value !== "");
                Errors.NewUsername = ValidNewUsername ? "" : Dictionary.UsernameError1;

                if (Errors.NewUsername != "") {
                    break;
                }

                ValidNewUsername = (value.match(/^[a-z0-9]+$/i));
                Errors.NewUsername = ValidNewUsername ? "" : Dictionary.UsernameError2;
                break;
            case "NewEmail":
                ValidNewEmail = (value !== "");
                Errors.NewEmail = ValidNewEmail ? "" : Dictionary.EmailError1;

                if (Errors.NewEmail != "") {
                    break;
                }

                ValidNewEmail = (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
                Errors.NewEmail = ValidNewEmail ? "" : Dictionary.EmailError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidNewUsername: ValidNewUsername,
            ValidNewEmail: ValidNewEmail,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidNewUsername &&
                    this.state.ValidNewEmail
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        if (this.state.NewUsername === this.state.Username &&
            this.state.NewEmail === this.state.Email) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        if (this.state.NewUsername !== this.state.Username) {
            const response = await validateUsername(this.state.NewUsername);

            if (response.Message === "Username is unavailable.") {
                let errors = this.state.Errors;
                errors.NewUsername = response.Message;

                this.setState({
                    ShowPreloader: false,
                    Errors: errors,
                    ValidForm: false,
                });

                return;
            }
        }

        if (this.state.NewEmail !== this.state.Email) {
            const response = await validateEmail(this.state.NewEmail);
            if (response.Message === "Email is already taken.") {
                let errors = this.state.Errors;
                errors.NewEmail = response.Message;

                this.setState({
                    ShowPreloader: false,
                    Errors: errors,
                    ValidForm: false,
                });

                return;
            }
        }

        this.setState({
            ShowPreloader: true
        });

        const updatedAdministrator = {
            Token: sessionStorage.Token,
            Username: this.state.NewUsername,
            Email: this.state.NewEmail,
        };

        await usernameAndEmailSettings(updatedAdministrator).then(response => {
            this.setState({
                ShowPreloader: false,
                ValidForm: false,
            });

            if (response.Message === "Administrator is updated.") {
                this.setState({
                    Username: this.state.NewUsername,
                    Email: this.state.NewEmail
                });

                this.props.OnSettingsSaved();
            }
        });
    }

    render() {
        const {
            NewUsername,
            NewEmail,
            ValidForm,
            ShowPreloader,
            Errors
        } = this.state;

        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>{Dictionary.UsernameAndEmail}</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="entity-list entity-list-expandable">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-at"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="text" name="NewUsername" className="form-control" autocomplete="off"
                                        value={NewUsername} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.Username}</div>
                                <div className="content-text-secondary text-danger">{Errors.NewUsername}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-envelope"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="email" name="NewEmail" className="form-control" placeholder="someone@example.com" autocomplete="off"
                                        value={NewEmail} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.Email}</div>
                                <div className="content-text-secondary text-danger">{Errors.NewEmail}</div>
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
            </section> 
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        UsernameAndEmail: "اسم المستخدم والبريد الإلكتروني",
        Username: "اسم المستخدم",
        Email: "البريد الإلكترونيl",
        SaveChanges: "حفظ التغييرات؟",
        Undone: ".هذا لا يمكن التراجع عنها",
        Save: "حفظ",
        UsernameError1: ".اسم المستخدم مطلوب",
        UsernameError2: ".إسم المستخدم غير صحيح",
        EmailError1: ".البريد الالكتروني مطلوب",
        EmailError2: ".البريد الإلكتروني غير صالح",
    };
}
else {
    Dictionary = {
        UsernameAndEmail: "Username and Email",
        Username: "Username",
        Email: "Email",
        SaveChanges: "Save Changes?",
        Undone: "This cannot be undone.",
        Save: "Save",
        UsernameError1: "Username is required.",
        UsernameError2: "Username is invalid.",
        EmailError1: "Email is required.",
        EmailError2: "Email is invalid.",
    };
}

export default UsernameAndEmailSettings;