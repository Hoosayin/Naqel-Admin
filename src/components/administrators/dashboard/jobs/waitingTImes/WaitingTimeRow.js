import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";

import {
    deleteWaitingTime
} from "../../../AdministratorFunctions";

class WaitingTimeRow extends Component {
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

        let discardedWaitingTime = {
            Token: sessionStorage.Token,
            WaitingTimeID: this.props.WaitingTime.WaitingTimeID
        };

        await deleteWaitingTime(discardedWaitingTime).then(response => {
            console.log("DELETE RESPONSE");
            console.log(response);
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Waiting time is deleted.") {
                this.props.OnWaitingTimeDeleted();
            }
        });
    };

    render() {
        const {
            ShowProgressRing
        } = this.state;

        const {
            Index,
            WaitingTime
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
                {ShowProgressRing ? 
                    <span className="m-l-xxs"><ProgressRing /></span> : null}
            </td>
            <td>{`${WaitingTime.WaitingTime} ${Dictionary.Hours}`}</td>
            <td className="text-right">
                <button className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-waiting-time-dialog-${Index}`}>{Dictionary.Delete}</button>

                <div className="modal modal-center-vertical" id={`delete-waiting-time-dialog-${Index}`}
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
        Hours: "ساعات",
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف وقت الانتظار هذا؟",
    };
}
else {
    Dictionary = {
        Hours: "Hours",
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this waiting time?",
    };
}

export default WaitingTimeRow;