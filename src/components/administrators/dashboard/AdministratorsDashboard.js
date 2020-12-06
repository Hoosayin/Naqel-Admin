import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Drivers from "./Drivers/Drivers";
import Traders from "./traders/Traders";
import Jobs from "./jobs/Jobs";
import Trucks from "./Trucks/Trucks";
import Permits from "./Permits/permitTypes/PermitTypes";
import Questions from "./questions/Questions";
import FeeRates from "./feeRates/FeeRates";
import FinancialAccounts from "./financialAccounts/financialAccounts";
import jwt_decode from "jwt-decode";
import PageNotFoundContainer from "../../../containers/404/404";

class AdministratorsDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Left: -400
        };
    }

    render() {
        if (!sessionStorage.Token) {
            return <Redirect to={"/login"} />;
        }
        else if (!jwt_decode(sessionStorage.Token).AdministratorID) {
            return <PageNotFoundContainer />;
        }
        else {
            return <section>
                <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                    padding: "10px",
                    backgroundColor: "#133F4F",
                    width: "100%",
                    margin: "0px",
                }}>
                    <li role="presentation" className="active">
                        <a href="#drivers" aria-controls="drivers" role="tab" data-toggle="tab">{Dictionary.Drivers}</a>
                    </li>
                    <li role="presentation">
                        <a href="#traders" aria-controls="traders" role="tab" data-toggle="tab">{Dictionary.Traders}</a>
                    </li>
                    <li role="presentation">
                        <a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">{Dictionary.Jobs}</a>
                    </li>
                    <li role="presentation">
                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">{Dictionary.Trucks}</a>
                    </li>
                    <li role="presentation">
                        <a href="#permits" aria-controls="permits" role="tab" data-toggle="tab">{Dictionary.Permits}</a>
                    </li>
                    <li role="presentation">
                        <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab">{Dictionary.Questions}</a>
                    </li>
                    <li role="presentation">
                        <a href="#fee-rates" aria-controls="fee-rates" role="tab" data-toggle="tab">{Dictionary.FeeRates}</a>
                    </li>
                    <li role="presentation">
                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{Dictionary.Profile}</a>
                    </li>
                    <li role="presentation">
                        <a href="#financial-accounts" aria-controls="financial-accounts" role="tab" data-toggle="tab">{Dictionary.FinancialAccounts}</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane" id="profile">
                        <Profile />
                    </div>
                    <div role="tabpanel" className="tab-pane active" id="drivers">
                        <Drivers />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="traders">
                        <Traders />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="jobs">
                        <Jobs />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="trucks">
                        <Trucks />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="permits">
                        <Permits />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="questions">
                        <Questions />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="fee-rates">
                        <FeeRates />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="financial-accounts">
                        <FinancialAccounts />
                    </div>
                </div>
            </section>;
        }
    }
}

const GetDirection = () => {
    return (!LLanguage || LLanguage === "English") ? "ltr" : "rtl";
};

const LLanguage = sessionStorage.Language;
let Dictionary;

if (LLanguage === "Arabic") {
    Dictionary = {
        Drivers: "السائقين",
        Traders: "التجار",
        Jobs: "وظائف",
        Trucks: "الشاحنات",
        Permits: "تسمح",
        Questions: "الأسئلة",
        FeeRates: "معدلات الرسوم",
        Profile: "الملف الشخصي",
        FinancialAccounts: "الحسابات المالية"
    };
}
else {
    Dictionary = {
        Drivers: "Drivers",
        Traders: "Traders",
        Jobs: "Jobs",
        Trucks: "Trucks",
        Permits: "Permits",
        Questions: "Questions",
        FeeRates: "Fee Rates",
        Profile: "Profile",
        FinancialAccounts: "Financial Accounts"
    };
}

export default AdministratorsDashboard;