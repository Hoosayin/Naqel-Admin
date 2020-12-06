import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import ResponsibleQuestionClasses from "./ResponsibleQuestionClasses";
import { classifyResponsibleQuestion } from "../../../AdministratorFunctions";

class ClassifyResponsibleQuestionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onClassSelected = this.onClassSelected.bind(this);
    }

    onClassSelected = async questionClass => {
        this.setState({
            ShowPreloader: true
        });

        const classifiedResponsibleQuestion = {
            Token: sessionStorage.Token,
            ResponsibleQuestionID: this.props.ResponsibleQuestionID,
            Class: questionClass
        };

        await classifyResponsibleQuestion(classifiedResponsibleQuestion).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Question is classified.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    };

    render() {
        const {
            ShowPreloader
        } = this.state;

        const {
            Index,
            Class,
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`classify-responsible-question-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="jumbotron theme-default">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-h3 color-default p-t-n">{Dictionary.ClassifyTheQuestion}</div>
                                            <div className="type-h7 p-t-xxxs" dir={GetDirection()}>{Class ? `${Dictionary.CurrentClass}: ${Class}` : `${Dictionary.CurrentClass}: Unclassified`}</div>
                                            <div className="m-t-xxxs">
                                                <ResponsibleQuestionClasses OnClassSelected={this.onClassSelected} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        ClassifyTheQuestion: "صنف السؤال",
        CurrentClass: "الفصل الحالي"
    };
}
else {
    Dictionary = {
        ClassifyTheQuestion: "Classify the Question",
        CurrentClass: "Current Class"
    };
}

export default ClassifyResponsibleQuestionDialog;