import React, { Component } from "react";
import Strings from "../../res/strings";

class BillContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const bill = this.props.Bill;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h5 color-default p-t-n">
                            {`${index + 1}. Bill Number: ${bill.BillNumber}`}
                            {index === 0 ? <span class="badge back-color-golden m-l-xxs">NEW</span> : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-dollar-sign"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Amount</div>
                                        <div className="content-text-secondary">{`${bill.Amount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-certificate"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Paid</div>
                                        <div className="content-text-secondary">{bill.Paid ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-hashtag"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Job Number</div>
                                        <div className="content-text-secondary">{bill.JobNumber}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Generated On</div>
                                        <div className="content-text-secondary">{`DATE: ${new Date(bill.Created).toDateString()}`}</div>
                                        <div className="content-text-secondary">{`TIME: ${new Date(bill.Created).toLocaleTimeString()}`}</div>
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

export default BillContainer;