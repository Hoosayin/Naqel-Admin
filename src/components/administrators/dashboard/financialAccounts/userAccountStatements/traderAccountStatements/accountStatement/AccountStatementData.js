import React, { Component } from "react";
import RowData from "./RowData";
import Strings from "../../../../../../../res/strings";

class AccountStatementData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            AccountStatement
        } = this.props;

        const trader = AccountStatement.Trader;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            {(AccountStatement.Bills.length === 0) ?
                <section>
                    <div className="jumbotron theme-default" style={{ height: "100vh" }} dir={GetDirection()}>
                        <div className="container">
                            <div className="text-center p-xxs">
                                <div className="type-h4">
                                    <span className="fas fa-exclamation-triangle m-r-xxs m-l-xxs" style={{ color: "#FFBF15" }}></span>{Dictionary.NoBillingDetails}.</div>
                            </div>
                        </div>
                    </div>
                </section> :
                <section>
                    <div className="jumbotron theme-default back-color-light" dir={GetDirection()}>
                        <div className="container">
                            <div className="type-t3" style={{ fontWeight: "600" }}><span className="fas fa-route m-r-xxxs m-l-xxxs"></span>{Dictionary.Naqel}</div>

                            <div className="p-t-xxs">
                                <div className="type-t8">{`${trader.FirstName} ${trader.LastName}`}</div>
                                <div className="type-t9">{`@${trader.Username}`}</div>
                                <div className="type-t8">{trader.Type}</div>
                                <div className="type-t8">{trader.Address}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>{Dictionary.Date}</th>
                                    <th>{Dictionary.BillNumber}</th>
                                    <th>{Dictionary.Paid}</th>
                                    <th>{Dictionary.FeeRate}</th>
                                    <th>{Dictionary.PayMethod}</th>
                                    <th>{Dictionary.RecipientCharges}</th>
                                    <th>{Dictionary.NaqelCharges}</th>
                                    <th>{Dictionary.Amount}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AccountStatement.Bills.map((bill, index) => {
                                    return <RowData key={index}
                                        Index={index}
                                        Bill={bill} />;
                                })}
                                <tr style={{ backgroundColor: "#DADADA" }}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{Dictionary.Total}</td>
                                    <td>{`${AccountStatement.TotalRecipientAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                                    <td>{`${AccountStatement.TotalChargedAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                                    <td>{`${AccountStatement.TotalAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>}
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
        NoBillingDetails: "لم يتم العثور على تفاصيل الفوترة",
        Naqel: "نا قل",
        Date: "تاريخ",
        BillNumber: "رقم الفاتوره",
        Paid: "دفع؟",
        FeeRate: "معدل الرسوم",
        PayMethod: "طريقة الدفع",
        RecipientCharges: "رسوم المتلقي",
        NaqelCharges: "تهم نا قل",
        Amount: "كمية",
        Total: "مجموع"
    };
}
else {
    Dictionary = {
        NoBillingDetails: "No billing details found",
        Naqel: "NAQEL",
        Driver: "Driver",
        Date: "DATE",
        BillNumber: "BILL NUMBER",
        Paid: "PAID?",
        FeeRate: "FEE RATE",
        PayMethod: "PAY METHOD",
        RecipientCharges: "RECIPIENT CHARGES",
        NaqelCharges: "NAQEL CHARGES",
        Amount: "AMOUNT",
        Total: "TOTAL"
    };
}

export default AccountStatementData;