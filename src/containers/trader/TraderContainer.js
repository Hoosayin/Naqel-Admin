import React, { Component } from "react";
import UUID from "uuid-v4";
import SearchingContainer from "../searching/SearchingContainer";
import DocumentsDialog from "./documents/DocumentsDialog";
import { getPublicData } from "../../components/shared/UserFunctions";

class TraderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TraderProfile: null,
            Searching: false
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.refresh.bind(this);
    }

    async componentDidMount() {
        if (this.props.Refresh) {
            this.props.Refresh(this.refresh);
        }
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {

            this.setState({
                Searching: true
            });

            let request = {
                Get: "TraderProfile",
                Params: {
                    TraderID: this.props.TraderID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Trader profile found.") {
                    this.setState({
                        TraderProfile: response.Trader,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TraderProfile: null,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (sessionStorage.Token) {
            let request = {
                Get: "TraderProfile",
                Params: {
                    TraderID: this.props.TraderID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Trader profile found.") {
                    this.setState({
                        TraderProfile: response.Trader
                    });
                }
                else {
                    this.setState({
                        TraderProfile: null
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching || !this.state.TraderProfile) {
            return <SearchingContainer Searching={this.state.Searching}
                SearchingFor={Dictionary.Trader} />;
        }
        else {
            const traderProfile = this.state.TraderProfile;
            const trader = traderProfile;
            const onJob = trader.OnJob;
            const profilePhoto = trader.PhotoURL ?
                trader.PhotoURL :
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
                                    {`${trader.FirstName} ${trader.LastName}`}
                                    {onJob ? <span class="badge back-color-golden m-l-xxs">{Dictionary.OnJob}</span> : null}
                                </div>
                                <div className="type-sh3">
                                    <span className="fas fa-briefcase m-r-xxxs" style={{ color: "#606060" }}></span>{trader.Type}
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
                                                    <div className="content-text-secondary">{(trader.Active) ?
                                                        <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                        <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className={(trader.Gender === "Male") ? "fas fa-male" : "fas fa-female"}></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Gender}</div>
                                                    <div className="content-text-secondary">{trader.Gender}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-birthday-cake"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Birthday}</div>
                                                    <div className="content-text-secondary">{trader.DateOfBirth}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-flag"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Nationality}</div>
                                                    <div className="content-text-secondary">{trader.Nationality}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-envelope"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.Email}</div>
                                                    <div className="content-text-secondary">{trader.Email}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.PhoneNumber}</div>
                                                    <div className="content-text-secondary">{trader.PhoneNumber}</div>
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
                                        <a dir={GetDirection()} href={`https://api.whatsapp.com/send?phone=${trader.PhoneNumber.replace("+", "")}`} 
                                        target="_blank" className="btn btn-primary">{Dictionary.ChatOnWhatsApp}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.TabView ?
                    null : 
                    <DocumentsDialog DialogID={dialogID}
                        TraderID={this.props.TraderID} />}
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
        Trader: "التاجر",
        OnJob: "على الوظيفة",
        Active: "نشيط",
        Gender: "جنس",
        Birthday: "عيد الميلاد",
        Nationality: "الجنسية",
        Email: "البريد الإلكتروني",
        PhoneNumber: "رقم الهاتف",
        Documents: "مستندات",
        ChatOnWhatsApp: "الدردشة على WhatsApp"
    };
}
else {
    Dictionary = {
        Trader: "Trader",
        OnJob: "ON JOB",
        Active: "Active",
        Gender: "Gender",
        Birthday: "Birthday",
        Nationality: "Nationality",
        Email: "Email",
        PhoneNumber: "Phone Number",
        Documents: "Documents",
        ChatOnWhatsApp: "Chat on WhatsApp"
    };
}

export default TraderContainer;