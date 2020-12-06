import React, { Component } from "react";

class WarningAlert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="alert alert-warning alert-dismissible fade in" role="alert" style={{ marginBottom: "0px" }}>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.props.OnClose(null)}>
                    <span aria-hidden="true"><i class="glyph glyph-cancel"></i></span>
                </button>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-24">
                            <p>{this.props.Message}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default WarningAlert;