import React, { Component } from "react";

class ProgressBar extends Component {
    render() {
        return <div className="progress-bar">
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
        </div>;
    }
};

export default ProgressBar