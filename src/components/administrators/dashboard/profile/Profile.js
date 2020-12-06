import React, { Component } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { getData } from "../../AdministratorFunctions";
import Settings from "./settings/Settings";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            FirstName: "",
            LastName: "",
            Email: "",
            Username: "",
            PhotoURL: "./images/defaultProfilePhoto.png"
        };
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
                        FirstName: administrator.FirstName,
                        LastName: administrator.LastName,
                        Email: administrator.Email,
                        Username: administrator.Username,
                        PhoneNumber: administrator.PhoneNumber,
                        PhotoURL: administrator.PhotoURL
                    });
                }
                else {
                    this.setState({
                        FirstName: "",
                        LastName: "",
                        Email: "",
                        Username: "",
                        PhoneNumber: "",
                        PhotoURL: "./images/defaultProfilePhoto.png"
                    });
                }
            });
        }
    }

    render() {
        const {
            FirstName,
            LastName,
            Email,
            Username,
            PhoneNumber,
            PhotoURL
        } = this.state;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <ProfilePhoto PhotoURL={PhotoURL}
                                OnProfilePhotoUpdated={async () => { await this.componentDidMount(); }} />
                        </div>
                        <div className="col-md-18">
                            <div className="type-h3 color-default p-t-xxs">{FirstName + " " + LastName}</div>
                            <div className="type-sh3">
                                <span className="fas fa-user-shield m-r-xxs" style={{ color: "#606060" }}></span>{Dictionary.Administrator}
                            </div>

                            <div className="row">
                                <div className="col-md-24">
                                    <div className="entity-list">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-at"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Username}</div>
                                                    <div className="content-text-secondary">{Username}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">{Dictionary.Email}</div>
                                                <div className="content-text-secondary">{Email}</div>
                                            </div>
                                        </div>
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-phone"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">{Dictionary.PhoneNumber}</div>
                                                <div className="content-text-secondary">{PhoneNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Settings OnSettingsSaved={async () => { await this.componentDidMount(); }} />
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
        Administrator: "مدير",
        Username: "اسم المستخدم",
        Email: "البريد الإلكتروني",
        PhoneNumber: "رقم الهاتف"
    };
}
else {
    Dictionary = {
        Administrator: "Administrator",
        Username: "Username",
        Email: "Email",
        PhoneNumber: "Phone Number"
    };
}

export default Profile;