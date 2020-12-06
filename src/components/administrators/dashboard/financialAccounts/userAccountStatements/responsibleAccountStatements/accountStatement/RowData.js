import React, { Component } from "react";
import Strings from "../../../../../../../res/strings";

class RowData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Transaction
        } = this.props;

        return <tr>
            <td>
                <strong>{`${new Date(Transaction.Date).toLocaleDateString()}`}</strong>
            </td>

            <td>{Transaction.TruckNumber}</td>

            <td>{Transaction.JobNumber}</td>

            <td>{Transaction.TraderBillNumber}</td>

            <td>
                {Transaction.TraderBillPaid ?
                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}
            </td>

            <td>{Transaction.TraderPaymentMethod}</td>

            <td>{Transaction.DriverBillNumber}</td>

            <td>
                {Transaction.DriverBillPaid ?
                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}
            </td>

            <td>{Transaction.DriverPaymentMethod}</td>

            <td>{`${Transaction.FeeRate}%`}</td>

            <td>{`${Transaction.Earned.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>

            <td>{`${Transaction.Charged.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>

            <td>{`${Transaction.Amount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
        </tr>;
    }
};

export default RowData;