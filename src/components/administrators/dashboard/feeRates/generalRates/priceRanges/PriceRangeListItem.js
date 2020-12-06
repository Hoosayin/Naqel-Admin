import React, { Component } from "react";
import UpdatePriceRangeDialog from "./UpdatePriceRangeDialog";
import ProgressRing from "../../../../../../controls/ProgressRing";
import { deletePriceRange } from "../../../../AdministratorFunctions";

class PriceRangeListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowProgressRing: false
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async () => {
        this.setState({
            ShowProgressRing: true
        });

        let discardedPriceRange = {
            Token: sessionStorage.Token,
            PriceRangeID: this.props.PriceRange.PriceRangeID
        };

        await deletePriceRange(discardedPriceRange).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Price range is deleted.") {
                this.props.OnPriceRangeDeleted(this.props.PriceRange);
            }
        });
    };

    render() {
        const {
            ShowProgressRing
        } = this.state;

        const {
            Index,
            PriceRange
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
                {ShowProgressRing ?
                    <span className="m-l-xxs"><ProgressRing /></span> : null}
            </td>

            <td>{`$${parseFloat(PriceRange.StartRange).toFixed(2)}`}</td>
            <td>{`$${parseFloat(PriceRange.EndRange).toFixed(2)}`}</td>
            <td>{`${PriceRange.FeeRate}%`}</td>

            <td className="text-right">
                <button className="btn btn-secondary"
                    data-toggle="modal"
                    data-target={`#update-fee-rate-dialog-${Index}`}>{Dictionary.EditFeeRate}</button>
                <button className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-price-range-dialog-${Index}`}>{Dictionary.Delete}</button>

                <UpdatePriceRangeDialog Index={Index}
                    FeeRate={PriceRange.FeeRate}
                    PriceRangeID={PriceRange.PriceRangeID}
                    OnOK={this.props.OnPriceRangeUpdated} />

                <div className="modal modal-center-vertical" id={`delete-price-range-dialog-${Index}`}
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                        <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                            <div className="modal-header">
                                <div className="text-right">
                                    <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                        data-dismiss="modal"
                                        ref={cancelButton => this.cancelButton = cancelButton}>
                                        <span className="fas fa-times"></span>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="jumbotron theme-default" dir={GetDirection()}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-sh3 m-b-xxs">{Dictionary.DeleteMessage}</div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-danger"
                                                    onClick={async () => {
                                                        this.cancelButton.click();
                                                        await this.onDelete();
                                                    }}>{Dictionary.Delete}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        EditFeeRate: "تحرير معدل الرسوم",
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف هذا النطاق السعري؟",
    };
}
else {
    Dictionary = {
        EditFeeRate: "Edit Fee Rate",
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this price range?",
    };
}

export default PriceRangeListItem;