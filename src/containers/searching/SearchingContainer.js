import React, { Component } from "react";
import ProgressBar from "../../controls/ProgressBar";

class SearchingContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const searching = this.props.Searching;
        const searchingFor = this.props.SearchingFor;

        return <section dir={GetDirection()}>
            <div className="jumbotron theme-default" style={{ width: "100%", height: "100vh" }}>
                <div className="container">
                    <div className="row">
                        {searching ? <div className="col-md-24 text-center">
                            <div>
                                <div className="type-h3" style={{ color: "#008575" }}>{Dictionary.Searching}</div>
                                <ProgressBar />
                            </div>
                        </div> : <div className="col-md-24 text-center">
                                <h3><span className="fas fa-exclamation-triangle m-r-xxs m-l-xxs" style={{ color: "#FFBF15" }}></span>{searchingFor} {Dictionary.NotFound}</h3>
                            </div>}
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
        Searching: "يبحث",
        NotFound: "غير معثور عليه"
    };
}
else {
    Dictionary = {
        Searching: "Searching",
        NotFound: "Not Found"
    };
}

export default SearchingContainer;