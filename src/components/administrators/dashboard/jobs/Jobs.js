import React, { Component } from "react";
import ObjectionReasons from "./objectionReasons/ObjectionReasons";
import ObjectionableJobs from "./objectionableJobs/ObjectionableJobs";
import WaitingTimes from "./waitingTImes/WaitingTimes";

class Jobs extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#objection-reasons" aria-controls="objection-reasons" role="tab" data-toggle="tab">{Dictionary.ObjectionReasons}</a>
                </li>
                <li role="presentation">
                    <a href="#objectionable-jobs" aria-controls="objectionable-jobs" role="tab" data-toggle="tab">{Dictionary.ObjectionableJobs}</a>
                </li>
                <li role="presentation">
                    <a href="#waiting-times" aria-controls="waiting-times" role="tab" data-toggle="tab">{Dictionary.WaitingTimes}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="objection-reasons">
                    <ObjectionReasons />
                </div>
                <div role="tabpanel" class="tab-pane" id="objectionable-jobs">
                    <ObjectionableJobs />
                </div>
                <div role="tabpanel" class="tab-pane" id="waiting-times">
                    <WaitingTimes />
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
        ObjectionReasons: "أسباب الاعتراض",
        ObjectionableJobs: "الوظائف المرفوضة",
        WaitingTimes: "أوقات انتظار الوظيفة"
    };
}
else {
    Dictionary = {
        ObjectionReasons: "Objection Reasons",
        ObjectionableJobs: "Objectionable Jobs",
        WaitingTimes: "Job Waiting Times"
    };
}

export default Jobs;