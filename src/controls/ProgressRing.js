import React, { Component } from "react";

class ProgressRing extends Component {
    render() {
        return <div className="progress-ring">
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
            <div className="progress-circle"></div>
        </div>;
    }
};

export default ProgressRing;