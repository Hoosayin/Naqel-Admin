import React, { Component } from "react";
import Strings from "../../../../../../../res/strings";

class RowData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Bill
        } = this.props;

        return <tr>
            <td>
                <strong>{`${new Date(Bill.Created).toLocaleDateString()}`}</strong>
            </td>

            <td>{Bill.BillNumber}</td>

            <td>
                {Bill.Paid ?
                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}
            </td>

            <td>{`${Bill.FeeRate}%`}</td>

            <td>{Bill.PaymentMethod}</td>

            <td>{`${Bill.RecipientAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>

            <td>{`${Bill.ChargedAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>

            <td>{`${Bill.Amount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
        </tr>;
    }
};

export default RowData;