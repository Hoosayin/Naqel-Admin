import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import GeneralRates from "./generalRates/GeneralRates";
import TraderRates from "./traderRates/TraderRates";

class FeeRates extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="FEE RATES" /> */}
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#general-rates" aria-controls="general-rates" role="tab" data-toggle="tab">{Dictionary.GeneralRates}</a>
                </li>
                <li role="presentation">
                    <a href="#trader-rates" aria-controls="trader-rates" role="tab" data-toggle="tab">{Dictionary.TraderRates}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="general-rates">
                    <GeneralRates />
                </div>
                <div role="tabpanel" class="tab-pane" id="trader-rates">
                    <TraderRates />
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
        GeneralRates: "الأسعار العامة",
        TraderRates: "أسعار التجار"
    };
}
else {
    Dictionary = {
        GeneralRates: "General Rates",
        TraderRates: "Trader Rates"
    };
}

export default FeeRates;