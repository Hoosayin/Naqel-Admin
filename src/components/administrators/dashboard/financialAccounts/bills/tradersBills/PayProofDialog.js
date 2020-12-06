import React, { Component } from "react";
import PayProofContainer from "../../../../../../containers/payProof/PayProofContainer";

class PayProofDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            PayProof
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`trader-pay-proof-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <PayProofContainer PayProof={PayProof} />
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default PayProofDialog;