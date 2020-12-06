import React, { Component } from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const message = this.props.Message;
        const type = this.props.Type;

        return <div class="alert-stack">
            <div class={`alert alert-${type} alert-dismissible fade in`} role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
                </button>
                <div class="container">
                    <div class="row">
                        <div class="col-md-24">
                            <p>{this.props.Message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
};

export default Alert;