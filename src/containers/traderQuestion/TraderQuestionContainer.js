import React, { Component } from "react";

class TraderQuestionContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Question
        } = this.props;

        const askedOn = new Date(Question.Created);
        const askedBy = Question.AskedBy;
        const traderAnswer = Question.TraderAnswer;
        const answeredOn = traderAnswer ? new Date(traderAnswer.Created) : null;
        const answeredBy = traderAnswer ? traderAnswer.AnsweredBy : null;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="type-h5 color-default p-t-n" dir={GetDirection()}>{`${Index + 1}. ${Dictionary.QuestionID}: ${Question.QuestionNumber}`}</div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-user"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">
                                            <span className="fas fa-briefcase m-r-xxxs"></span>
                                            {`${askedBy.FirstName} ${askedBy.LastName}`}
                                        </div>
                                        <div className="content-text-secondary">{askedBy.Username}</div>
                                        <div className="content-text-secondary" dir={GetDirection()}>{`${askedOn.toDateString()} ${Dictionary.At} ${askedOn.toLocaleTimeString()}`}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-question"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">
                                            <span className="m-r-xxxs">{Dictionary.Question}</span>
                                            {Question.Class ?
                                                <span class="badge back-color-golden">{Question.Class.toUpperCase()}</span> :
                                                <span class="badge back-color-golden">UNCLASSIFIED</span>}
                                        </div>
                                        <div className="content-text-secondary">{Question.Question}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {traderAnswer ? 
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-user"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">
                                                <span className="fas fa-user-shield m-r-xxxs"></span>
                                                {`${answeredBy.FirstName} ${answeredBy.LastName}`}
                                            </div>
                                            <div className="content-text-secondary">{answeredBy.Username}</div>
                                            <div className="content-text-secondary" dir={GetDirection()}>{`${answeredOn.toDateString()} ${Dictionary.At} ${answeredOn.toLocaleTimeString()}.`}</div>
                                        </div>
                                    </div>
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-comment"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">
                                                <span className="m-r-xxxs">{Dictionary.Answer}</span>
                                                {traderAnswer.Edited ? <span className="color-default">{Dictionary.Edited}</span> : null}
                                            </div>
                                            <div className="content-text-secondary">{traderAnswer.Answer}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> : 
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-comment"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">
                                                <span className="m-r-xxxs">{Dictionary.Answer}</span>
                                            </div>
                                            <div className="content-text-secondary">{Dictionary.AnswerDetails}</div>
                                        </div>
                                    </div>
                                </div>
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
        QuestionID: "معرف السؤال",
        At: "في",
        Question: "سؤال",
        Answer: "إجابة",
        Edited: "محررة",
        AnswerDetails: ".هذا السؤال مازال لم يجب عليه حتى الان"
    };
}
else {
    Dictionary = {
        QuestionID: "Question ID",
        At: "at",
        Question: "Question",
        Answer: "Answer",
        Edited: "EDITED",
        AnswerDetails: "This question has not been answered yet."
    };
}

export default TraderQuestionContainer;