import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { setRefundRate } from "../../AdministratorFunctions";

class SetRefundRateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            RefundRate: this.props.Trader.TraderRefundRate ? this.props.Trader.TraderRefundRate.RefundRate : 0,

            ValidRefundRate: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                RefundRate: ""
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
        let ValidRefundRate = this.state.ValidRefundRate;

        switch (field) {
            case "RefundRate":
                ValidRefundRate = (value !== "");
                Errors.RefundRate = ValidRefundRate ? "" : Dictionary.RefundRateError1;

                if (Errors.RefundRate !== "") {
                    break;
                }

                ValidRefundRate = (value >= 0 && value <= 100);
                Errors.RefundRate = ValidRefundRate ? "" : Dictionary.RefundRateError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidRefundRate: ValidRefundRate,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidRefundRate
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

        const traderRefundRate = {
            Token: sessionStorage.Token,
            TraderID: this.props.Trader.TraderID,
            RefundRate: this.state.RefundRate
        };

        await setRefundRate(traderRefundRate).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Refund rate is set.") {
                this.cancelButton.click();
                this.props.OnOK(response.RefundRate);
            }
        });


    }

    render() {
        const {
            RefundRate,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        const {
            Index,
            Trader
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`set-refund-rate-dialog-${Index}`}
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
                                                <div className="type-h3 color-default p-t-n">{Dictionary.RefundRate}</div>
                                                <div className="type-sh3 m-b-xxs" dir={GetDirection()}>{Dictionary.ThisSets} 
                                                    <span className="color-default">{` ${Trader.FirstName} ${Trader.LastName}`}</span>.
                                                    </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.RefundRateField}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="RefundRate" className="form-control" autoComplete="off"
                                                        value={RefundRate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.RefundRate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Set} className="btn btn-primary" disabled={!ValidForm} />
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
        RefundRate: "معدل الاسترداد",
        ThisSets: "يؤدي هذا إلى تعيين معدل النسبة المئوية للرد",
        RefundRateField: "(٪)معدل الاسترداد",
        Set: "Set",
        RefundRateError1: ".مطلوب سعر الاسترداد",
        RefundRateError2: ".يجب أن يكون معدل رد الأموال بين 0 و 100"
    };
}
else {
    Dictionary = {
        RefundRate: "Refund Rate",
        ThisSets: "This sets refund percentage rate for",
        RefundRateField: "Refund Rate (%)",
        Set: "Set",
        RefundRateError1: "Refund Rate is required.",
        RefundRateError2: "Refund rate must be between 0 and 100."
    };
}

export default SetRefundRateDialog;