import React, { Component } from "react";
import Strings from "../../../../../res/strings";

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
                <strong>{`${new Date(Transaction.Created).toLocaleDateString()}`}</strong>
            </td>

            <td>{Transaction.BillNumber}</td>

            <td>{Transaction.Payee}</td>

            <td>{Transaction.PayeeType}</td>

            <td>{Transaction.PaymentMethod}</td>

            <td>{`${Transaction.Amount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
        </tr>;
    }
};

export default RowData;