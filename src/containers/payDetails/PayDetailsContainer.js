import React, { Component } from "react";

class PayDetailsContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            PayDetails
        } = this.props;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-24">
                            <div className="type-h3 color-default p-t-n">Credit Card Payment</div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-user"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Owner Name</div>
                                                <div className="content-text-secondary">{PayDetails.OwnerName}</div>
                                            </div>
                                        </div>
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Owner Email</div>
                                                <div className="content-text-secondary">{PayDetails.OwnerEmail}</div>
                                            </div>
                                        </div>
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-credit-card"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Payment Method</div>
                                                <div className="content-text-secondary">{PayDetails.CardType.toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-certificate"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Approved</div>
                                                <div className="content-text-secondary">
                                                    <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-calendar"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Paid On</div>
                                                <div className="content-text-secondary">{`DATE: ${new Date(PayDetails.Created).toDateString()}`}</div>
                                                <div className="content-text-secondary">{`TIME: ${new Date(PayDetails.Created).toLocaleTimeString()}`}</div>
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

export default PayDetailsContainer;