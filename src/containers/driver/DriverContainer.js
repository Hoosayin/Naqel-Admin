import React, { Component } from "react";
import UUID from "uuid-v4";
import Rating from "../../controls/Rating";
import SearchingContainer from "../searching/SearchingContainer";
import DocumentsDialog from "./documents/DocumentsDialog";
import { getPublicData } from "../../components/shared/UserFunctions";

class DriverContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverProfile: null,
            Searching: false
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        this.props.Refresh(this.refresh);
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {

            this.setState({
                Searching: true
            });

            let request = {
                Get: "DriverProfile",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Driver profile found.") {
                    this.setState({
                        DriverProfile: response.Driver,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        DriverProfile: null,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (sessionStorage.Token) {

            let request = {
                Get: "DriverProfile",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Driver profile found.") {
                    this.setState({
                        DriverProfile: response.Driver
                    });
                }
                else {
                    this.setState({
                        DriverProfile: null
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching || !this.state.DriverProfile) {
            return <SearchingContainer Searching={this.state.Searching}
                SearchingFor={Dictionary.Driver} />;
        }
        else {
            const driverProfile = this.state.DriverProfile;
            const driver = driverProfile;
            const ratingAndReviews = driverProfile.RatingAndReviews
            const onJob = driverProfile.OnJob;
            const profilePhoto = driverProfile.PhotoURL ?
                driverProfile.PhotoURL :
                "./images/defaultProfilePhoto.png";

            const dialogID = UUID().substring(0, 7).toUpperCase();

            return <section>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={profilePhoto} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {`${driver.FirstName} ${driver.LastName} `}
                                    {onJob ? <span class="badge back-color-golden">{Dictionary.OnJob}</span> : null}
                                </div>
                                <div className="type-sh3"><span className="fas fa-car m-r-xxs" style={{ color: "#606060" }}></span>{Dictionary.Driver}</div>
                                <div className="type-sh3">
                                    <span><Rating Rating={ratingAndReviews.Reviews > 0 ? ratingAndReviews.Rating : 0}
                                        Color="" Size="rating-small"
                                        Label={ratingAndReviews.Reviews > 0 ?
                                            `(${ratingAndReviews.Reviews} ${Dictionary.Reviews})` : `${Dictionary.NoReviews}`} /></span>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-globe-asia"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Active}</div>
                                                    <div className="content-text-secondary">{(driver.Active === 1) ?
                                                        <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                        <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class={(driver.Gender === "Male") ? "fas fa-male" : "fas fa-female"}></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.Gender}</div>
                                                    <div class="content-text-secondary">{driver.Gender}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-birthday-cake"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.Birthday}</div>
                                                    <div class="content-text-secondary">{driver.DateOfBirth}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-envelope"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.Email}</div>
                                                    <div class="content-text-secondary">{driver.Email}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-phone"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.PhoneNumber}</div>
                                                    <div class="content-text-secondary">{driver.PhoneNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-flag"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.Nationality}</div>
                                                    <div class="content-text-secondary">{driver.Nationality}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                {this.props.TabView ?
                                    null : 
                                    <button type="button" className="btn btn-default"
                                        style={{ minWidth: "152px" }} data-toggle="modal"
                                        data-target={`#documents-dialog-${dialogID}`}>{Dictionary.Documents}</button>}
                                        <a dir={GetDirection()} href={`https://api.whatsapp.com/send?phone=${driver.PhoneNumber.replace("+", "")}`} 
                                        target="_blank" className="btn btn-primary">{Dictionary.ChatOnWhatsApp}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.TabView ?
                    null :
                    <DocumentsDialog DialogID={dialogID}
                        DriverID={this.props.DriverID} />}
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
        OnJob: "في العمل",
        Driver: "سائق",
        Reviews: "المراجعات",
        NoReviews: "لم يتم تقديم تعليقات",
        Active: "نشيط",
        Gender: "جنس",
        Birthday: "عيد الميلاد",
        Email: "البريد الإلكتروني",
        PhoneNumber: "رقم الهاتف",
        Nationality: "الجنسية",
        Documents: "مستندات",
        ChatOnWhatsApp: "الدردشة على WhatsApp"
    };
}
else {
    Dictionary = {
        OnJob: "ON JOB",
        Driver: "Driver",
        Reviews: "Review(s)",
        NoReviews: "No Reviews",
        Active: "Active",
        Gender: "Gender",
        Birthday: "Birthday",
        Email: "Email",
        PhoneNumber: "Phone Number",
        Nationality: "Nationality",
        Documents: "Documents",
        ChatOnWhatsApp: "Chat on WhatsApp"
    };
}

export default DriverContainer;