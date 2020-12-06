import React, { Component } from "react";
import ResponsibleQuestionContainer from "../../../../../containers/responsibleQuestion/ResponsibleQuestionContainer";
import AnswerResponsibleQuestionDialog from "./AnswerResponsibleQuestionDialog";
import ClassifyResponsibleQuestionDialog from "./ClassifyResponsibleQuestionDialog";

class ResponsibleQuestionListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Question
        } = this.props;

        return <section>
            <ResponsibleQuestionContainer Index={Index}
                Question={Question} />

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-secondary m-t-n"
                    data-toggle="modal"
                    data-target={`#classify-responsible-question-dialog-${Index}`}>{Dictionary.Classify}</button>

                <button className="btn btn-primary m-t-n"
                    data-toggle="modal"
                    data-target={`#answer-responsible-question-dialog-${Index}`}>{Question.ResponsibleAnswer ? Dictionary.UpdateAnswer : Dictionary.Answer}</button>
            </div>

            <AnswerResponsibleQuestionDialog Index={Index}
                ResponsibleQuestionID={Question.ResponsibleQuestionID}
                QuestionNumber={Question.QuestionNumber}
                Answer={Question.ResponsibleAnswer ? Question.ResponsibleAnswer.Answer : ""}
                OnOK={this.props.OnQuestionUpdated} />

            <ClassifyResponsibleQuestionDialog Index={Index}
                ResponsibleQuestionID={Question.ResponsibleQuestionID}
                Class={Question.Class}
                OnOK={this.props.OnQuestionUpdated} />
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
        Classify: "صنف",
        UpdateAnswer: "إجابة التحديث",
        Answer: "إجابة"
    };
}
else {
    Dictionary = {
        Classify: "Classify",
        UpdateAnswer: "Update Answer",
        Answer: "Answer"
    };
}

export default ResponsibleQuestionListItem;