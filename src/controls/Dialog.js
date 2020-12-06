import React, { Component } from "react";

class ProgressRing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div class="modal modal-center-vertical" id={this.props.ID}
            tabIndex="-1" role="dialog"
            aria-labelledby="modal-sample-label" aria-hidden="true">
            <div class="modal-dialog" style={{ width: "95%" }}>
                <div class="modal-content">
                    <div className="jumbotron" style={{ backgroundColor: "#E5E5E5" }}>
                        <div className="container">
                            <div class="modal-header">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    <span className={`fas fa-${this.props.Icon}`}></span>{` ${this.props.Title}`}</div>
                            </div>
                            <div class="modal-body">
                                <div class="entity-list">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div class="item-content-primary" style={{ margin: "0 0 0 48px" }}>
                                                    <div class="content-text-primary">App</div>
                                                    <div class="content-text-secondary">Phone number is required.Phone number is required.Phone number is required.Phone number is required.Phone number is required.Phone number is required.</div>
                                                    <div class="form-group" style={{ margin: "0px" }}>
                                                        <input type="email" class="form-control" style={{ margin: "0px" }} id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div class="item-content-primary" style={{ margin: "0 0 0 48px" }}>
                                                    <div class="content-text-primary">App</div>
                                                    <div class="content-text-secondary">Phone number is required.</div>
                                                    <div class="form-group" style={{ margin: "0px" }}>
                                                        <input type="email" class="form-control" style={{ margin: "0px" }} id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div class="item-content-primary" style={{ margin: "0 0 0 48px" }}>
                                                    <div class="content-text-primary">App</div>
                                                    <div class="content-text-secondary"></div>
                                                    <div class="form-group" style={{ margin: "0px" }}>
                                                        <input type="email" class="form-control" style={{ margin: "0px" }} id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div class="item-content-primary" style={{ margin: "0 0 0 48px" }}>
                                                    <div class="content-text-primary">App</div>
                                                    <div class="content-text-secondary">Phone number is required.</div>
                                                    <div class="form-group" style={{ margin: "0px" }}>
                                                        <input type="email" class="form-control" style={{ margin: "0px" }} id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div class="item-content-primary" style={{ margin: "0 0 0 48px" }}>
                                                    <div class="content-text-primary">App</div>
                                                    <div class="content-text-secondary">Phone number is required.</div>
                                                    <div class="form-group" style={{ margin: "0px" }}>
                                                        <input type="email" class="form-control" style={{ margin: "0px" }} id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span className="fas fa-phone"></span>
                                                </div>
                                                <div class="item-content-primary" style={{ margin: "0 0 0 48px" }}>
                                                    <div class="content-text-primary">App</div>
                                                    <div class="content-text-secondary">Phone number is required.</div>
                                                    <div class="form-group" style={{ margin: "0px" }}>
                                                        <input type="email" class="form-control" style={{ margin: "0px" }} id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="btn-group">
                                    <button type="button" class="btn btn-primary">Button</button>
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
};

export default ProgressRing;