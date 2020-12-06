import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { blockDriverAccount } from "../../AdministratorFunctions";

class BlockAccountDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            BlockDate: "",
            Reason: "",

            ValidBlockDate: false,
            ValidReason: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                BlockDate: "",
                Reason: ""
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
        let ValidBlockDate = this.state.ValidBlockDate;
        let ValidReason = this.state.ValidReason;

        switch (field) {
            case "BlockDate":
                ValidBlockDate = (value !== "");
                Errors.BlockDate = ValidBlockDate ? "" : Dictionary.BlockDateError1;

                if (Errors.BlockDate !== "") {
                    break;
                }

                ValidBlockDate = (new Date(value).getTime() >= new Date().getTime());
                Errors.BlockDate = ValidBlockDate ? "" : Dictionary.BlockDateError2;
                break;
            case "Reason":
                ValidReason = (value !== "");
                Errors.Reason = ValidReason ? "" : Dictionary.ReasonError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidBlockDate: ValidBlockDate,
            ValidReason: ValidReason,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidBlockDate &&
                        this.state.ValidReason
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

        const blockedDriver = {
            Token: sessionStorage.Token,
            DriverID: this.props.Driver.DriverID,
            BlockDate: this.state.BlockDate,
            Reason: this.state.Reason
        };

        await blockDriverAccount(blockedDriver).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Driver account is blocked.") {
                this.cancelButton.click();
                this.props.OnOK();

                const {
                    Driver
                } = this.props;

                let phoneNumber = Driver.PhoneNumber.replace("+", "");
                let message = `Hi ${Driver.FirstName} ${Driver.LastName}! We have blocked your NAQEL account up to ${new Date(this.state.BlockDate).toDateString()}. REASON: ${this.state.Reason}. ~ Team NAQEL`;
                message = message.replace(" ", "%20");

                window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, "_blank");
            }
        });


    }

    render() {
        const {
            BlockDate,
            Reason,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        const {
            Index,
            Driver
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`block-account-dialog-${Index}`}
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
                                                <div className="type-h3 color-default p-t-n">{Dictionary.BlockDriver}</div>
                                                <div className="type-sh3 m-b-xxs" dir={GetDirection()}>{Dictionary.YouAreGoingToBlock}
                                                    <span className="color-default">{` ${Driver.FirstName} ${Driver.LastName}`}</span>.
                                                    </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.BlockTill}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="BlockDate" className="form-control" autoComplete="off"
                                                        value={BlockDate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.BlockDate}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label className="control-label">{Dictionary.Reason}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <textarea rows="6" class="form-control" name="Reason" style={{ maxWidth: "100%" }}
                                                        value={Reason} onChange={this.onChange}></textarea>
                                                    <span className="text-danger">{Errors.Reason}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.BlockNow} className="btn btn-danger" disabled={!ValidForm} />
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
    return (!LLanguage || LLanguage === "English") ? "ltr" : "rtl";
};

const LLanguage = sessionStorage.Language;
let Dictionary;

if (LLanguage === "Arabic") {
    Dictionary = {
        BlockDriver: "سائق كتلة",
        YouAreGoingToBlock: "أنت ذاهب لمنع",
        BlockTill: "كتلة حتى",
        Reason: "السبب",
        BlockNow: "حظر الآن",
        BlockDateError1: ".التاريخ مطلوب",
        BlockDateError2: ".يجب أن يكون التاريخ بعد يوم أمس",
        ReasonError: ".السبب مطلوب",
    };
}
else {
    Dictionary = {
        BlockDriver: "Block Driver",
        YouAreGoingToBlock: "You are going to block",
        BlockTill: "Block Till",
        Reason: "Reason",
        BlockNow: "Block Now",
        BlockDateError1: "Date is required",
        BlockDateError2: "Date must be later than yesterday.",
        ReasonError: "Reason is required.",
    };
}

export default BlockAccountDialog;