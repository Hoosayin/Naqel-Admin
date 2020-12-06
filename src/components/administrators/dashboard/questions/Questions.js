import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import DriverQuestions from "./driverQuestions/DriverQuestions";
import TraderQuestions from "./traderQuestions/TraderQuestions";
import ResponsibleQuestions from "./responsibleQuestions/ResponsibleQuestions";

class Questions extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="QUESTIONS" /> */}
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#driver-questions" aria-controls="driver-questions" role="tab" data-toggle="tab">{Dictionary.DriversQuestions}</a>
                </li>
                <li role="presentation">
                    <a href="#trader-questions" aria-controls="trader-questions" role="tab" data-toggle="tab">{Dictionary.TradersQuestions}</a>
                </li>
                <li role="presentation">
                    <a href="#responsible-questions" aria-controls="responsible-questions" role="tab" data-toggle="tab">{Dictionary.TCResponsiblesQuestions}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="driver-questions">
                    <DriverQuestions />
                </div>
                <div role="tabpanel" class="tab-pane" id="trader-questions">
                    <TraderQuestions />
                </div>
                <div role="tabpanel" class="tab-pane" id="responsible-questions">
                    <ResponsibleQuestions />
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
        DriversQuestions: "أسئلة السائق",
        TradersQuestions: "أسئلة التاجر",
        TCResponsiblesQuestions: "أسئلة المسؤولين عن شركة النقل"
    };
}
else {
    Dictionary = {
        DriversQuestions: "Driver's Questions",
        TradersQuestions: "Trader's Questions",
        TCResponsiblesQuestions: "TC Responsible's Questions"
    };
}

export default Questions;