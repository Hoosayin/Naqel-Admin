import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { getData, updateAdminSecret } from "../../../AdministratorFunctions";

class AdminSecretSettings extends Component {
    constructor() {
        super();

        this.state = {
            AdminSecret: "",

            ValidAdminSecret: true,

            ValidForm: false,
            SettingsSaved: false,
            ShowPreloader: false,

            Errors: {
                AdminSecret: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "AdminSecret"
            };

            await getData(request).then(response => {
                if (response.Message === "Admin secret found.") {
                    this.setState({
                        AdminSecret: response.AdminSecret
                    });
                }
                else {
                    this.setState({
                        AdminSecret: ""
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
        let {
            Errors,
            ValidAdminSecret
        } = this.state;

        switch (field) {
            case "AdminSecret":
                ValidAdminSecret = value !== "";
                Errors.AdminSecret = ValidAdminSecret ? "" : Dictionary.AdminSecretError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidAdminSecret: ValidAdminSecret,
        }, () => {
            this.setState({
                ValidForm: ValidAdminSecret
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedAdminSecret = {
            Token: sessionStorage.Token,
            AdminSecret: this.state.AdminSecret
        };

        this.setState({
            ShowPreloader: true
        });

        await updateAdminSecret(updatedAdminSecret).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Admin secret is updated.") {
                this.props.OnSettingsSaved();
            }
        });
    }

    render() {
        const {
            AdminSecret,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>{Dictionary.AdminSecretSettings}</div>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="entity-list entity-list-expandable">
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-cog"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="AdminSecret" autoComplete="off"
                                    value={AdminSecret} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.AdminSecret}</div>
                            <div className="text-danger">{Errors.AdminSecret}</div>
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
        AdminSecretSettings: "إعدادات سر المسؤول",
        AdminSecret: "سر المسؤول",
        SaveChanges: "حفظ التغييرات؟",
        Undone: ".هذا لا يمكن التراجع عنها",
        Save: "حفظ",
        AdminSecretError: ".السر مطلوب",
    };
}
else {
    Dictionary = {
        AdminSecretSettings: "Admin Secret Settings",
        AdminSecret: "Admin Secret",
        SaveChanges: "Save Changes?",
        Undone: "This cannot be undone.",
        Save: "Save",
        AdminSecretError: "Secret is required.",
    };
}

export default AdminSecretSettings;