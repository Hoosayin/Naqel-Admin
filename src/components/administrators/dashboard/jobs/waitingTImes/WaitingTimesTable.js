import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import WaitingTimeRow from "./WaitingTimeRow";
import AddWaitingTimeDialog from "./AddWaitingTimeDialog";
import { getPublicData } from "../../../../shared/UserFunctions";

class WaitingTimesTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            WaitingTimes: [],
            Searching: false,
            Refreshing: false
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "WaitingTimes"
            };

            this.setState({
                Searching: true
            });

            await getPublicData(request).then(response => {
                if (response.Message === "Waiting times found.") {
                    this.setState({
                        WaitingTimes: response.WaitingTimes,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        WaitingTimes: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            WaitingTimes,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-hourglass m-r-xxs m-l-xxs"></span>{Dictionary.JobWaitingTimes}</div>
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#add-waiting-time-dialog`}>{Dictionary.AddNew}</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddWaitingTimeDialog OnOK={async () => { await this.onComponentUpdated(); }} />

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.WaitingTimes}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            {(WaitingTimes.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.WaitingTimes} /> :
                <div class="table-responsive back-color-gray" style={{ height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Number}</th>
                                <th>{Dictionary.WaitingTime}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {WaitingTimes.map((waitingTime, index) => {
                                return <WaitingTimeRow key={index}
                                    Index={index}
                                    WaitingTime={waitingTime}
                                    OnWaitingTimeDeleted={async () => { await this.onComponentUpdated(); }} />;
                            })}
                        </tbody>
                    </table>
                </div>}
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
        JobWaitingTimes: "أوقات انتظار الوظيفة",
        AddNew: "اضف جديد",
        WaitingTimes: "أوقات الانتظار",
        Number: "رقم",
        WaitingTime: "وقت الانتظار"
    };
}
else {
    Dictionary = {
        JobWaitingTimes: "Job Waiting Times",
        AddNew: "Add New",
        WaitingTimes: "Waiting Times",
        Number: "NUMBER",
        WaitingTime: "WAITING TIME"
    };
}

export default WaitingTimesTable;