import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addDriverAnswer } from "../../../AdministratorFunctions";

class AnswerDriverQuestionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Answer: this.props.Answer,

            ValidAnswer: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Answer: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidAnswer = this.state.ValidAnswer;

        switch (field) {
            case "Answer":
                ValidAnswer = (value !== "");
                Errors.Answer = ValidAnswer ? "" : Dictionary.AnswerError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidAnswer: ValidAnswer,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidAnswer
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const driverAnswer = {
            Token: sessionStorage.Token,
            DriverQuestionID: this.props.DriverQuestionID,
            Answer: this.state.Answer
        };

        await addDriverAnswer(driverAnswer).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Answer is added.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    }

    render() {
        const {
            Answer,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        const {
            Index,
            QuestionNumber
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`answer-driver-question-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
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
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n" dir={GetDirection()}>{Dictionary.AnswerQuestion}
                                                    <span className="color-default m-l-xxxs">{QuestionNumber}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label className="control-label">{Dictionary.Answer}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <textarea rows="6" class="form-control" name="Answer" style={{ maxWidth: "100%" }}
                                                        value={Answer} onChange={this.onChange}></textarea>
                                                    <span className="text-danger">{Errors.Answer}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Share} className="btn btn-primary" disabled={!ValidForm} />
                                        </div>
                                    </div>
                                </div>
                            </form>
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
        AnswerQuestion: "الجواب لمعرف السؤال:",
        Answer: "إجابة",
        Share: "شارك",
        AnswerError: ".مطلوب الإجابة"
    };
}
else {
    Dictionary = {
        AnswerQuestion: "Answer for Question ID:",
        Answer: "Answer",
        Share: "Share",
        AnswerError: "Answer is required."
    };
}

export default AnswerDriverQuestionDialog;