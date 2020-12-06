import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addWaitingTime } from "../../../AdministratorFunctions";

class AddWaitingTimeDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            WaitingTime: "",
            ValidWaitingTime: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                WaitingTime: ""
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
        let {
            Errors,
            ValidWaitingTime
        } = this.state;

        switch (field) {
            case "WaitingTime":
                ValidWaitingTime = (value !== "");
                Errors.WaitingTime = ValidWaitingTime ? "" : Dictionary.WaitingTimeError1;

                if (!ValidWaitingTime) {
                    break;
                }

                ValidWaitingTime = (value >= 48);
                Errors.WaitingTime = ValidWaitingTime ? "" : Dictionary.WaitingTimeError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidWaitingTime: ValidWaitingTime,
        }, () => {
                this.setState({
                    ValidForm: ValidWaitingTime
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

        const newWaitingTime = {
            Token: sessionStorage.Token,
            WaitingTime: this.state.WaitingTime
        };

        await addWaitingTime(newWaitingTime).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Waiting time is added.") {
                this.cancelButton.click();
                this.props.OnOK();

                this.setState({
                    WaitingTime: "",
                    ValidWaitingTime: false,
        
                    ValidForm: false,
                    ShowPreloader: false,
        
                    Errors: {
                        WaitingTime: ""
                    }
                });
            }
        });
    }

    render() {
        const {
            WaitingTime,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-waiting-time-dialog`}
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
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n">{Dictionary.AddNewWaitingTime}</div>
                                                <div class="form-group">
                                                    <label className="control-label">{Dictionary.WaitingTime}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="WaitingTime" className="form-control" autoComplete="off"
                                                        value={WaitingTime} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.WaitingTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Add} className="btn btn-primary" disabled={!ValidForm} />
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
        AddNewWaitingTime: "أضف وقت انتظار جديد",
        WaitingTime: "وقت الانتظار",
        Add: "أضف",
        WaitingTimeError1: ".مطلوب وقت الانتظار",
        WaitingTimeError2: ".يجب أن يكون وقت الانتظار أكبر من 47 ساعة"
    };
}
else {
    Dictionary = {
        AddNewWaitingTime: "Add New Waiting Time",
        WaitingTime: "Waiting Time",
        Add: "Add",
        WaitingTimeError1: "Waiting time is required.",
        WaitingTimeError2: "Waiting time must be greater than 47 hours."
    };
}

export default AddWaitingTimeDialog;