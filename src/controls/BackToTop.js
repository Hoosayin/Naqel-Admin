import React, { Component } from "react";

class BackToTop extends Component {
    render() {
        return (
            <a id="up" href="#top" className="back-to-top" style={{ position: "fixed", left: "20px", bottom: "20px", }}>
                <i className="glyph glyph-up" style={{ color: "#008575", }}></i>
                <span className="sr-only">Back to top</span>
            </a>
        );
    }
};

export default BackToTop;