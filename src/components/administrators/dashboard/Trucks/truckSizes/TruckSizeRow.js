import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";

import {
    deleteTruckSize
} from "../../../AdministratorFunctions";

class TruckSizeRow extends Component {
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

        let discardedTruckSize = {
            Token: sessionStorage.Token,
            TruckSizeID: this.props.TruckSize.TruckSizeID
        };

        await deleteTruckSize(discardedTruckSize).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Truck size is deleted.") {
                this.props.OnTruckSizeDeleted();
            }
        });
    };

    render() {
        const {
            ShowProgressRing
        } = this.state;

        const {
            Index,
            ShowDeleteButton,
            TruckSize
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
                {ShowProgressRing ? 
                    <span className="m-l-xxs"><ProgressRing /></span> : null}
            </td>
            <td>{`${TruckSize.TruckSize} KG`}</td>
            <td className="text-right">
                {ShowDeleteButton ? 
                <button className="btn btn-danger"
                data-toggle="modal"
                data-target={`#delete-truck-size-dialog-${Index}`}>{Dictionary.Delete}</button> : null}

                {ShowDeleteButton ? 
                <div className="modal modal-center-vertical" id={`delete-truck-size-dialog-${Index}`}
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
            </div> : null}
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
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف حجم الشاحنة هذا؟",
    };
}
else {
    Dictionary = {
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this truck size?",
    };
}

export default TruckSizeRow;