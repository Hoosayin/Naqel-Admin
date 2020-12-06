import React, { Component } from "react";
import TraderObjectionReasons from "./traderObjectionReasons/TraderObjectionReasons";
import DriverObjectionReasons from "./driverObjectionReasons/DriverObjectionReasons";

class ObjectionReasons extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#trader-objection-reasons" aria-controls="job-tab" role="tab" data-toggle="tab">{Dictionary.TraderObjectionReasons}</a>
                </li>
                <li role="presentation">
                    <a href="#driver-objection-reasons" aria-controls="trader-tab" role="tab" data-toggle="tab">{Dictionary.DriverObjectionReasons}</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="trader-objection-reasons">
                    <TraderObjectionReasons />
                </div>
                <div role="tabpanel" className="tab-pane" id="driver-objection-reasons">
                    <DriverObjectionReasons />
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
        TraderObjectionReasons: "أسباب اعتراض التاجر",
        DriverObjectionReasons: "أسباب اعتراض السائق",
    };
}
else {
    Dictionary = {
        TraderObjectionReasons: "Trader Objection Reasons",
        DriverObjectionReasons: "Driver Objection Reasons",
    };
}

export default ObjectionReasons;