import React, { Component } from "react";
import UUID from "uuid-v4";
import SearchingContainer from "../searching/SearchingContainer";
import TrailersDialog from "./TrailersDialog";
import { getPublicData } from "../../components/shared/UserFunctions";

class TruckContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TruckProfile: null,
            Searching: false
        }

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
                Get: "TruckProfile",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Truck profile found.") {

                    if (this.props.OnTrailersFound) {
                        this.props.OnTrailersFound(response.TruckProfile.Trailers);
                    }

                    this.setState({
                        TruckProfile: response.TruckProfile,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TruckProfile: null,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (sessionStorage.Token) {

            let request = {
                Get: "TruckProfile",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Truck profile found.") {

                    if (this.props.OnTrailersFound) {
                        this.props.OnTrailersFound(response.TruckProfile.Trailers);
                    }

                    this.setState({
                        TruckProfile: response.TruckProfile
                    });
                }
                else {
                    this.setState({
                        TruckProfile: null
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching || !this.state.TruckProfile) {
            return <SearchingContainer Searching={this.state.Searching}
                SearchingFor={Dictionary.Truck} />;
        }
        else {
            const truckProfile = this.state.TruckProfile;
            const truck = truckProfile.Truck;
            const dialogID = UUID().substring(0, 7).toUpperCase();

            return <section>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={truck.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {`${truck.Brand} ${truck.Model}`}
                                </div>
                                <div className="type-sh3">
                                    <span className="fas fa-truck m-r-xxs" style={{ color: "#606060" }}></span>{truck.Type}
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-list-ol"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.PlateNumber}</div>
                                                    <div class="content-text-secondary">{truck.PlateNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-user"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.Owner}</div>
                                                    <div class="content-text-secondary">{truck.Owner}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-calendar-day"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.ProductionYear}</div>
                                                    <div class="content-text-secondary">{truck.ProductionYear}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-weight"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.MaximumWeight}</div>
                                                    <div class="content-text-secondary">{`${truck.MaximumWeight} KG`}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.props.TabView ?
                                    null :
                                    <button type="button" className="btn btn-default"
                                        style={{ minWidth: "152px" }} data-toggle="modal"
                                        data-target={`#trailers-dialog-${dialogID}`}>{Dictionary.Trailers}</button>}
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.TabView ?
                    null :
                    <TrailersDialog Trailers={truckProfile.Trailers} DialogID={dialogID} />}
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
        Truck: "شاحنة",
        PlateNumber: "رقم لوحة",
        Owner: "صاحب",
        ProductionYear: "سنة الإنتاج",
        Brand: "العلامة التجارية",
        TruckModel: "نموذج الشاحنة",
        TruckType: "نوع الشاحنة",
        MaximumWeight: "الوزن الأقصى",
        Trailers: "المقطورات",

    };
}
else {
    Dictionary = {
        Truck: "Truck",
        PlateNumber: "Plate Number",
        Owner: "Owner",
        ProductionYear: "Production Year",
        Brand: "Brand",
        TruckModel: "Truck Model",
        TruckType: "Truck Type",
        MaximumWeight: "Maximum Weight",
        Trailers: "Trailers",
    };
}

export default TruckContainer;