import React, { Component } from "react";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import JobObjectionContainer from "../../../../../../containers/onGoingJob/JobObjectionContainer";
import { getData } from "../../../../AdministratorFunctions";

class Objections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobObjections: [],
            Searching: false,
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
                Get: "JobObjections",
                Params: {
                    OnGoingJobID: this.props.OnGoingJobID
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job objections found.") {
                    this.props.OnObjectionsFound(response.JobObjections.length);

                    this.setState({
                        JobObjections: response.JobObjections,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobObjections: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            JobObjections,
            Searching
        } = this.state;

        return <section>
            {(JobObjections.length === 0) ?
                <SearchingContainer Searching={Searching}
                    SearchingFor={Dictionary.JobObjections} /> :
                <ol className="list-items m-n">
                    {JobObjections.map((jobObjection, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <JobObjectionContainer Index={index} JobObjection={jobObjection} />
                        </li>;
                    })}
                </ol>}
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
        JobObjections: "اعتراضات الوظيفة"
    };
}
else {
    Dictionary = {
        JobObjections: "Job Objections"
    };
}

export default Objections;