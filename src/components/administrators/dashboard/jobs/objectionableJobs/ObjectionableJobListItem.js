import React, { Component } from "react";
import OnGoingJobContainer from "../../../../../containers/onGoingJob/JobContainer";
import Objections from "./jobObjections/Objections";
import DiscardObjectionableJobDialog from "./DiscardObjectionableJobDialog";

class ObjectionableJobListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Refreshing: false,
            NumberOfObjections: 0
        };
    }

    render() {
        const {
            NumberOfObjections
        } = this.state;

        const {
            Index,
            ObjectionableJob
        } = this.props;

        return <section>
            <OnGoingJobContainer Index={Index} OnGoingJob={ObjectionableJob} />
            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-danger m-n"
                    data-toggle="modal"
                    data-target={`#discard-objectionable-job-dialog-${Index}`}>{Dictionary.Discard}</button>
            </div>

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#objections-${Index}`}>
                <div className="type-h4 color-default text-right p-xxxs">
                    <span class="badge back-color-danger m-r-xxs">{NumberOfObjections}</span>{Dictionary.Objections}
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`objections-${Index}`}>
                <Objections OnGoingJobID={ObjectionableJob.OnGoingJobID}
                    OnObjectionsFound={numberOfObjections => {
                        this.setState({
                            NumberOfObjections: numberOfObjections
                        });
                    }} />
            </div>

            <DiscardObjectionableJobDialog Index={Index}
                OnGoingJobID={ObjectionableJob.OnGoingJobID}
                JobNumber={ObjectionableJob.JobNumber}
                OnOK={this.props.OnJobDiscarded}/>
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
        Discard: "تجاهل",
        Objections: "اعتراضات"
    };
}
else {
    Dictionary = {
        Discard: "Discard",
        Objections: "Objections"
    };
}

export default ObjectionableJobListItem;