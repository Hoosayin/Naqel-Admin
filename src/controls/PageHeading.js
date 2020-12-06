import React, { Component } from "react";

class PageHeading extends Component {
    render() {
        return <section>
            <div style={{ backgroundColor: "#1C6D6E", padding: "5px 5px 5px 20px" }}>
                <div className="sh1 color-light" style={{ fontWeight: "bold" }}>{`/ ${this.props.Heading}`}</div>
            </div>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#26525F" }}></div>
        </section>;
    }
};

export default PageHeading;