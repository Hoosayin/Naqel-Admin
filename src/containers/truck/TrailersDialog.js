import React, { Component } from "react";
import TrailerContainer from "./TrailerContainer";
import SearchingContainer from "../searching/SearchingContainer";

class TrailersDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const trailers = this.props.Trailers;

        let Trailers = (trailers.length > 0) ?
            <ol className="list-items" style={{ margin: "0px" }}>
                {trailers.map((trailer, index) => {
                    return <TrailerContainer key={index} Index={index} Trailer={trailer} />;
                })}
            </ol> : null;

        return <section>
            <div className="modal modal-center-vertical" id={`trailers-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            <div className="type-h2" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.Trailers}</div>
                        </div>
                        <div className="modal-body">
                            {(trailers.length === 0) ?
                                <SearchingContainer Searching={false}
                                    SearchingFor={Dictionary.Trailers} /> : Trailers}
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Trailers: "المقطورات",
    };
}
else {
    Dictionary = {
        Trailers: "Trailers",
    };
}

export default TrailersDialog;