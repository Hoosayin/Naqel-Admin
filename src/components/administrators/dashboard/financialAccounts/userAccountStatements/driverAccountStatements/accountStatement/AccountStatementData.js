import React, { Component } from "react";
import Strings from "../../../../../../../res/strings";
import RowData from "./RowData";

class AccountStatementData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            AccountStatement
        } = this.props;

        const driver = AccountStatement.Driver;

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
                                <div className="type-t8">{`${driver.FirstName} ${driver.LastName}`}</div>
                                <div className="type-t9">{`@${driver.Username}`}</div>
                                <div className="type-t8">Driver</div>
                                <div className="type-t8">{driver.Address}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>{Dictionary.Date}</th>
                                    <th>{Dictionary.JobNumber}</th>
                                    <th>{Dictionary.Earned}</th>
                                    <th>{Dictionary.BillNumber}</th>
                                    <th>{Dictionary.Paid}</th>
                                    <th>{Dictionary.PayMethod}</th>
                                    <th>{Dictionary.AmountCharged}</th>
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
                                    <td>{Dictionary.NetEarning}</td>
                                    <td>{`${AccountStatement.NetEarning.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                                    <td></td>
                                    <td></td>
                                    <td>{Dictionary.Total}</td>
                                    <td>{`$${AccountStatement.NetAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
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
        Driver: "سائق",
        Date: "تاريخ",
        JobNumber: "رقم الوظيفة",
        Earned: "حصل",
        BillNumber: "رقم الفاتوره",
        Paid: "دفع؟",
        PayMethod: "طريقة الدفع",
        AmountCharged: "المبلغ المطلوب",
        NetEarning: "صافي ربح",
        Total: "مجموع"
    };
}
else {
    Dictionary = {
        NoBillingDetails: "No billing details found",
        Naqel: "NAQEL",
        Driver: "Driver",
        Date: "DATE",
        JobNumber: "JOB NUMBER",
        Earned: "EARNED",
        BillNumber: "BILL NUMBER",
        Paid: "PAID?",
        PayMethod: "PAY METHOD",
        AmountCharged: "AMOUNT CHARGED",
        NetEarning: "NET EARNING",
        Total: "TOTAL"
    };
}

export default AccountStatementData;