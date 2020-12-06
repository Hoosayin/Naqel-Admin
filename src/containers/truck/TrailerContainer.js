import React, { Component } from "react";

class TrailerContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const trailer = this.props.Trailer;

        return <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={trailer.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-16">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{`${index + 1}.`}</div>
                                <div className="row">
                                    <div className="col-md-24">
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-weight"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.MaximumWeight}</div>
                                                    <div class="content-text-secondary">{`${trailer.MaximumWeight} KG`}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-cog"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.TrailerType}</div>
                                                    <div class="content-text-secondary">{trailer.Type}</div>
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
        MaximumWeight: "الوزن الأقصى",
        TrailerType: "نوع المقطورة",
    };
}
else {
    Dictionary = {
        MaximumWeight: "Maximum Weight",
        TrailerType: "Trailer Type",

    };
}

export default TrailerContainer;