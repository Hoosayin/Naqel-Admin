import React, { Component } from "react";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import ProgressRing from "../../../../../controls/ProgressRing";
import TraderQuestionListItem from "./TraderQuestionListItem";
import { getData } from "../../../AdministratorFunctions";

class TraderQuestionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllQuestions: [],
            Questions: [],
            SearchString: "",
            Searching: false,
            Refreshing: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "TraderQuestions"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Questions found.") {
                    this.setState({
                        AllQuestions: response.Questions,
                        Questions: response.Questions,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllQuestions: [],
                        Questions: [],
                        Searching: false
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();

        const searchString = this.state.SearchString;

        if (searchString === "") {
            this.setState({
                Questions: this.state.AllQuestions
            });

            return;
        }

        const allQuestions = this.state.AllQuestions;
        let filteredQuestions = [];
        let count = 0;

        for (let question of allQuestions) {
            if (question.Question.includes(searchString) ||
                question.QuestionNumber.includes(searchString) ||
                question.Class.includes(searchString)) {
                filteredQuestions[count++] = question;
            }
        }

        this.setState({
            Questions: filteredQuestions
        });
    }

    render() {
        const {
            Questions,
            SearchString,
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
                            <div className="type-h3 color-light"><span className="fas fa-question-circle m-r-xxs m-l-xxs"></span>{Dictionary.Questions}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.TradersQuestions}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder={Dictionary.SearchAQuestion}
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            {(Questions.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.Questions} /> :
                <ol className="list-items m-n">
                    {Questions.map((question, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <TraderQuestionListItem Index={index}
                                Question={question}
                                OnQuestionUpdated={this.onComponentUpdated} />
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
        Questions: "الأسئلة",
        TradersQuestions: "أسئلة التاجر",
        SearchAQuestion: "ابحث عن سؤال",
    };
}
else {
    Dictionary = {
        Questions: "Questions",
        TradersQuestions: "Trader's Questions",
        SearchAQuestion: "Search a Question",
    };
}

export default TraderQuestionsList;