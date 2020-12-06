import React, { Component } from "react";
import TradersBills from "./tradersBills/TradersBills";
import DriversBills from "./driversBills/DriversBills";

class Bills extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#traders-bills" aria-controls="traders-bills" role="tab" data-toggle="tab">{Dictionary.TradersBills}</a>
                </li>
                <li role="presentation">
                    <a href="#drivers-bills" aria-controls="drivers-bills" role="tab" data-toggle="tab">{Dictionary.DriversBills}</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="traders-bills">
                    <TradersBills />
                </div>
                <div role="tabpanel" className="tab-pane" id="drivers-bills">
                    <DriversBills />
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
        TradersBills: "فواتير التجار",
        DriversBills: "فواتير السائقين"
    };
}
else {
    Dictionary = {
        TradersBills: "Traders' Bills",
        DriversBills: "Drivers' Bills"
    };
}

export default Bills;