import React, { Component } from "react";

class MessageBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Show: this.props.Show,
            Message: this.props.Message,
        };
    }

    render() {
        return (
            <div class="modal in" style={this.state.Show ? { display: "block", paddingRight: "17px", } : { display: "none", paddingRight: "17px", }}>
                <div class="modal-dialog">
                    <div class="modal-content animated fadeIn">
                        <div class="modal-body text-justify">{this.state.Message}</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" onClick={e => { this.setState({ Show: false }); }}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MessageBox;