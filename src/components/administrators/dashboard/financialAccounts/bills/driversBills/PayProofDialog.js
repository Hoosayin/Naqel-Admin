import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import PayProofContainer from "../../../../../../containers/payProof/PayProofContainer";
import { approveDriverPayProof } from "../../../../AdministratorFunctions";

class PayProofDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false
        };

        this.onApprove = this.onApprove.bind(this);
    }

    onApprove = async () => {
        this.setState({
            ShowPreloader: true
        });

        const approvedDriverPayProof = {
            Token: sessionStorage.Token,
            DriverPayProofID: this.props.PayProof.DriverPayProofID,
        };

        await approveDriverPayProof(approvedDriverPayProof).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Driver pay proof is approved.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    }

    render() {
        const {
            ShowPreloader
        } = this.state;

        const {
            Index,
            PayProof
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`driver-pay-proof-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
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
                            <PayProofContainer PayProof={PayProof} />
                            {PayProof.Approved ? null : 
                                <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                                    <button className="btn btn-primary m-t-n" onClick={this.onApprove}>{Dictionary.Approve}</button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
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
        Approve: "يوافق"
    };
}
else {
    Dictionary = {
        Approve: "Approve"
    };
}

export default PayProofDialog;