import React, { Component } from "react";
import Strings from "../../../../../res/strings";
import RowData from "./RowData";

class AccountStatementData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            AccountStatement
        } = this.props;

        const naqelSettings = AccountStatement.NaqelSettings;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            {(AccountStatement.Transactions.length === 0) ?
                <section>
                    <div className="jumbotron theme-default" style={{ height: "100vh" }} dir={GetDirection()}>
                        <div className="container">
                            <div className="text-center p-xxs">
                                <div className="type-h4">
                                    <span className="fas fa-exclamation-triangle m-r-xxs m-l-xxs" style={{ color: "#FFBF15" }}></span>{Dictionary.NoTransactionsFound}.</div>
                            </div>
                        </div>
                    </div>
                </section> :
                <section>
                    <div className="jumbotron theme-default back-color-light" dir={GetDirection()}>
                        <div className="container">
                            <div className="type-t3" style={{ fontWeight: "600" }}><span className="fas fa-route m-r-xxxs"></span>{Dictionary.Naqel}</div>

                            <div className="p-t-xxs">
                                <div className="type-t8">{naqelSettings.Street}</div>
                                <div className="type-t8">{`${naqelSettings.City}, ${naqelSettings.Country}.`}</div>
                                <div className="type-t8">{`${Dictionary.ZIPs} ${naqelSettings.ZIPCode}`}</div>
                            </div>

                            <div className="p-t-xxs">
                                <div className="type-t8">{naqelSettings.PhoneNumber}</div>
                                <div className="type-t8">{naqelSettings.Website}</div>
                                <div className="type-t8">{naqelSettings.BusinessName}</div>
                            </div>

                            <div className="p-t-xxs">
                                <div className="type-t8">{Dictionary.BankName}</div>
                                <div className="type-t8">{naqelSettings.BankName}</div>
                                <div className="type-t8 p-t-xxxs">{Dictionary.AccountNumber} #</div>
                                <div className="type-t8">{naqelSettings.AccountNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>{Dictionary.Date}</th>
                                    <th>{Dictionary.BillNumber}</th>
                                    <th>{Dictionary.Payee}</th>
                                    <th>{Dictionary.PayeeType}</th>
                                    <th>{Dictionary.PayMethod}</th>
                                    <th>{Dictionary.Amount}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AccountStatement.Transactions.map((transaction, index) => {
                                    return <RowData key={index}
                                        Index={index}
                                        Transaction={transaction} />;
                                })}
                                <tr style={{ backgroundColor: "#DADADA" }}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{Dictionary.Total}</td>
                                    <td>{`${AccountStatement.NetAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
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
        NoTransactionsFound: "لم يتم العثور على معاملات",
        Naqel: "نا قل",
        ZIP: "الرمز البريدي",
        BankName: "اسم البنك",
        AccountNumber: "الحساب",
        Date: "تاريخ",
        BillNumber: "رقم الفاتوره",
        Payee: "المستفيد",
        PayeeType: "نوع الدفع",
        PayMethod: "طريقة الدفع",
        Amount: "كمية",
        Total: "مجموع",
    };
}
else {
    Dictionary = {
        NoTransactionsFound: "No transactions found",
        Naqel: "NAQEL",
        ZIP: "ZIP",
        BankName: "BANK NAME",
        AccountNumber: "Account",
        Date: "DATE",
        BillNumber: "BILL NUMBER",
        Payee: "PAYEE",
        PayeeType: "PAYEE TYPE",
        PayMethod: "PAY METHOD",
        Amount: "AMOUNT",
        Total: "TOTAL",
    };
}

export default AccountStatementData;