import React, { Component } from "react";

class PayProofContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const payProof = this.props.PayProof;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={payProof.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div className="col-md-18">
                            <div className="type-h3 color-default p-t-n">Payment Proof</div>
                            <div className="row">
                                <div className="col-md-24">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-certificate"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Approved</div>
                                                <div className="content-text-secondary">{payProof.Approved ?
                                                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                    <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-calendar"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Uploaded On</div>
                                                <div className="content-text-secondary">{`DATE: ${new Date(payProof.Created).toDateString()}`}</div>
                                                <div className="content-text-secondary">{`TIME: ${new Date(payProof.Created).toLocaleTimeString()}`}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default PayProofContainer;