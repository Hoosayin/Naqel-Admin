import React, { Component } from "react";

class DrivingLicenceContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const drivingLicence = this.props.DrivingLicence;

        return drivingLicence ? <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={drivingLicence.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-16">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.DrivingLicenceSubtitle}</div>
                                <div className="row">
                                    <div className="col-md-24">
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-hashtag"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.LicenceNumber}</div>
                                                    <div class="content-text-secondary">{drivingLicence.LicenceNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-cog"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.LicenceType}</div>
                                                    <div class="content-text-secondary">{drivingLicence.Type}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-calendar"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.ReleaseDate}</div>
                                                    <div class="content-text-secondary">{new Date(drivingLicence.ReleaseDate).toDateString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-calendar"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.ExpiryDate}</div>
                                                    <div class="content-text-secondary">{new Date(drivingLicence.ExpiryDate).toDateString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </section> : null;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        DrivingLicenceSubtitle: "رخصة قيادة",
        LicenceNumber: "رقم الرخصة",
        LicenceType: "نوع الترخيص",
        ReleaseDate: "يوم الاصدار",
        ExpiryDate: "تاريخ الانتهاء",
    };
}
else {
    Dictionary = {
        DrivingLicenceSubtitle: "Driving Licence",
        LicenceNumber: "Licence Number",
        LicenceType: "Licence Type",
        ReleaseDate: "Release Date",
        ExpiryDate: "Expiry Date",
    };
}

export default DrivingLicenceContainer;