import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import Bills from "./bills/Bills";
import UserAccountStatements from "./userAccountStatements/UserAccountStatements";
import AccountStatement from "./accountStatement/AccountStatement";

class FinancialAccounts extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="FINANCIAL ACCOUNTS" /> */}

            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#account-statement" aria-controls="account-statement" role="tab" data-toggle="tab">{Dictionary.AccountStatement}</a>
                </li>
                <li role="presentation">
                    <a href="#bills" aria-controls="bills" role="tab" data-toggle="tab">{Dictionary.Bills}</a>
                </li>
                <li role="presentation">
                    <a href="#user-account-statements" aria-controls="user-account-statements" role="tab" data-toggle="tab">{Dictionary.UserAccountStatements}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="account-statement">
                    <AccountStatement />
                </div>
                <div role="tabpanel" class="tab-pane" id="bills">
                    <Bills />
                </div>
                <div role="tabpanel" class="tab-pane" id="user-account-statements">
                    <UserAccountStatements />
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
        AccountStatement: "كشف حساب",
        Bills: "فواتير",
        UserAccountStatements: "كشوف حساب المستخدم"
    };
}
else {
    Dictionary = {
        AccountStatement: "Account Statement",
        Bills: "Bills",
        UserAccountStatements: "User Account Statements"
    };
}

export default FinancialAccounts;