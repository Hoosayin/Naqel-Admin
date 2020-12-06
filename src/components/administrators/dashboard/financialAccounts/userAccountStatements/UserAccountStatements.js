import React, { Component } from "react";
import TraderAccountStatements from "./traderAccountStatements/TraderAccountStatements";
import DriverAccountStatements from "./driverAccountStatements/DriverAccountStatements";
import ResponsibleAccountStatements from "./responsibleAccountStatements/ResponsibleAccountStatements";

class UserAccountStatements extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#trader-account-statements" aria-controls="trader-account-statements" role="tab" data-toggle="tab">{Dictionary.TraderAccountStatements}</a>
                </li>
                <li role="presentation">
                    <a href="#driver-account-statements" aria-controls="driver-account-statements" role="tab" data-toggle="tab">{Dictionary.DriverAccountStatements}</a>
                </li>
                <li role="presentation">
                    <a href="#responsible-account-statements" aria-controls="responsible-account-statements" role="tab" data-toggle="tab">{Dictionary.TCResponsibleAccountStatement}</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="trader-account-statements">
                    <TraderAccountStatements />
                </div>
                <div role="tabpanel" className="tab-pane" id="driver-account-statements">
                    <DriverAccountStatements />
                </div>
                <div role="tabpanel" className="tab-pane" id="responsible-account-statements">
                    <ResponsibleAccountStatements />
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
        TraderAccountStatements: "كشوف حساب التاجر",
        DriverAccountStatements: "كشوف حساب السائق",
        TCResponsibleAccountStatement: "كشف حساب مسؤول لشركة النقل"
    };
}
else {
    Dictionary = {
        TraderAccountStatements: "Trader Account Statements",
        DriverAccountStatements: "Driver Account Statements",
        TCResponsibleAccountStatement: "TC Responsible Account Statement"
    };
}

export default UserAccountStatements;