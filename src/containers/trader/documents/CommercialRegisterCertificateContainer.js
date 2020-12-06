import React, { Component } from "react";

class CommercialRegisterCertificateContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const commercialRegisterCertificate = this.props.CommercialRegisterCertificate;

        return commercialRegisterCertificate ? <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={commercialRegisterCertificate.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-16">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.CommercialRegisterCertificate}</div>
                                <div className="row">
                                    <div className="col-md-24">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-hashtag"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.CertificateNumber}</div>
                                                    <div className="content-text-secondary">{commercialRegisterCertificate.Number}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-cog"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.CertificateType}</div>
                                                    <div className="content-text-secondary">{commercialRegisterCertificate.Type}</div>
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
        CommercialRegisterCertificate: "شهادة السجل التجاري",
        CertificateNumber: "رقم شهادة",
        CertificateType: "نوع الشهادة",
    };
}
else {
    Dictionary = {
        CommercialRegisterCertificate: "Commercial Register Certificate",
        CertificateNumber: "Certificate Number",
        CertificateType: "Certificate Type",
    };
}

export default CommercialRegisterCertificateContainer;