import React, { Component } from "react";
import PayDetailsContainer from "../../../../../../containers/payDetails/PayDetailsContainer";

class PayDetailsDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            PayDetails
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`driver-pay-details-dialog-${Index}`}
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
                            <PayDetailsContainer PayDetails={PayDetails} />
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default PayDetailsDialog;