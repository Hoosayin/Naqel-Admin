import React, { Component } from "react";
import TruckSizes from "./truckSizes/TruckSizes";
import TruckTypes from "./truckTypes/TruckTypes";

class Trucks extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#truck-sizes" aria-controls="truck-sizes" role="tab" data-toggle="tab">{Dictionary.TruckSizes}</a>
                </li>
                <li role="presentation">
                    <a href="#truck-types" aria-controls="truck-types" role="tab" data-toggle="tab">{Dictionary.TruckTypes}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="truck-sizes">
                    <TruckSizes />
                </div>
                <div role="tabpanel" class="tab-pane" id="truck-types">
                    <TruckTypes />
                </div>
            </div>
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
        TruckSizes: "أحجام الشاحنات",
        TruckTypes: "أنواع الشاحنات"
    };
}
else {
    Dictionary = {
        TruckSizes: "Truck Sizes",
        TruckTypes: "Truck Types"
    };
}

export default Trucks;