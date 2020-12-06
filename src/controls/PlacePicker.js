import React, { Component } from "react";
import PlacePickerMap from "./PlacePickerMap";

class PlacePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoadingPlace: this.props.LoadingPlace,
            UnloadingPlace: this.props.UnloadingPlace,
        };
    }

    render() {
        const {
            LoadingPlace,
            UnloadingPlace
        } = this.state;

        const {
            OnLoadingPlacePicked,
            OnUnloadingPlacePicked
        } = this.props;

        return <section style={{ border: "4px solid #ADADAD" }}>
            <div className="type-h5 p-xxxs color-light" style={{ backgroundColor: "#ADADAD", fontWeight: "bold" }}>PICK PLACES</div>

            <div class="alert alert-info m-n" style={{ backgroundColor: "#E5E5E5" }}>
                <div class="row">
                    <div class="col-md-12">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#E5E5E5" }}>
                                    <span><img src="./images/source.svg" alt="source.svg" /></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">{Dictionary.LoadingPlace}</div>
                                    <div className="content-text-secondary">{LoadingPlace.Place}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#E5E5E5" }}>
                                    <span><img src="./images/destination.svg" alt="destination.svg" /></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">{Dictionary.UnloadingPlace}</div>
                                    <div className="content-text-secondary">{UnloadingPlace.Place}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#ADADAD" }}></div>

            <PlacePickerMap
                LoadingPlace={LoadingPlace}
                UnloadingPlace={UnloadingPlace}
                OnLoadingPlacePicked={loadingPlace => {
                    this.setState({
                        LoadingPlace: loadingPlace
                    });

                    OnLoadingPlacePicked(loadingPlace);
                }}
                OnUnloadingPlacePicked={unloadingPlace => {
                    this.setState({
                        UnloadingPlace: unloadingPlace
                    });

                    OnUnloadingPlacePicked(unloadingPlace);
                }} />
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
        LoadingPlace: "مكان التحميل",
        UnloadingPlace: "مكان التفريغ"

    };
}
else {
    Dictionary = {
        LoadingPlace: "Loading Place",
        UnloadingPlace: "Unloading Place"
    };
}

export default PlacePicker;