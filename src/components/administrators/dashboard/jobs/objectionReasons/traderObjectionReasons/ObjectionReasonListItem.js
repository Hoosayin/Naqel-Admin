import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";

import {
    deleteTraderObjectionReason,
    verifyTraderObjectionReason
} from "../../../../AdministratorFunctions";

class ObjectionReasonListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowProgressRing: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onVerify = this.onVerify.bind(this);
    }

    onDelete = async () => {
        this.setState({
            ShowProgressRing: true
        });

        let discardedTraderObjectionReason = {
            Token: sessionStorage.Token,
            DriverObjectionReasonID: this.props.ObjectionReason.DriverObjectionReasonID
        };

        await deleteTraderObjectionReason(discardedTraderObjectionReason).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Objection reason is deleted.") {
                this.props.OnObjectionReasonUpdated();
            }
        });
    };

    onVerify = async () => {
        this.setState({
            ShowProgressRing: true
        });

        let verifiedTraderObjectionReason = {
            Token: sessionStorage.Token,
            DriverObjectionReasonID: this.props.ObjectionReason.DriverObjectionReasonID
        };

        await verifyTraderObjectionReason(verifiedTraderObjectionReason).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Objection reason is verified.") {
                this.props.OnObjectionReasonUpdated();
            }
        });
    };

    render() {
        const {
            ShowProgressRing
        } = this.state;

        const {
            Index,
            ObjectionReason
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
                {ShowProgressRing ? 
                    <span className="m-l-xxs"><ProgressRing /></span> : null}
            </td>
            <td>
                {ObjectionReason.TraderID ?
                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span> :
                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span>}
            </td>
            <td>{ObjectionReason.Reason}</td>
            <td className="text-right">
                {ObjectionReason.TraderID ?
                    <button className="btn btn-primary"
                        data-toggle="modal"
                        data-target={`#verify-trader-objection-reason-${Index}`}>{Dictionary.Verify}</button> : null}
                <button className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-trader-objection-reason-${Index}`}>{Dictionary.Delete}</button>

                <div className="modal modal-center-vertical" id={`delete-trader-objection-reason-${Index}`}
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

                <div className="modal modal-center-vertical" id={`verify-trader-objection-reason-${Index}`}
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
                                                <div className="type-sh3 m-b-xxs">{Dictionary.VerifyMessage}</div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-primary"
                                                    onClick={async () => {
                                                        this.cancelButton.click();
                                                        await this.onVerify();
                                                    }}>{Dictionary.Verify}</button>
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
        Verify: "تحقق",
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف سبب الاعتراض هذا؟",
        VerifyMessage: "هل أنت متأكد أنك تريد التحقق من سبب الاعتراض هذا؟",
    };
}
else {
    Dictionary = {
        Verify: "Verify",
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this objection reason?",
        VerifyMessage: "Are you sure you want to verify this objection reason?",
    };
}

export default ObjectionReasonListItem;