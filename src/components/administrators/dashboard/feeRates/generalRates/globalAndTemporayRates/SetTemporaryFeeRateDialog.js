import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import { setTemporaryFeeRate } from "../../../../AdministratorFunctions";

class SetTemporaryFeeRateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FeeRate: "",
            Date: "",

            ValidFeeRate: false,
            ValidDate: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                FeeRate: "",
                Date: ""
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
        let ValidFeeRate = this.state.ValidFeeRate;
        let ValidDate = this.state.ValidDate;

        switch (field) {
            case "FeeRate":
                ValidFeeRate = (value !== "");
                Errors.FeeRate = ValidFeeRate ? "" : Dictionary.FeeRateError1;

                if (Errors.FeeRate !== "") {
                    break;
                }

                ValidFeeRate = (value >= 1 && value <= 100);
                Errors.FeeRate = ValidFeeRate ? "" : Dictionary.FeeRateError2;
                break;
            case "Date":
                ValidDate = (value !== "");
                Errors.Date = ValidDate ? "" : Dictionary.DateError1;

                if (Errors.Date !== "") {
                    break;
                }

                ValidDate = (new Date(value).getTime() >= new Date().getTime());
                Errors.Date = ValidDate ? "" : Dictionary.DateError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidFeeRate: ValidFeeRate,
            ValidDate: ValidDate
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidFeeRate &&
                        this.state.ValidDate
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

        const temporaryFeeRateData = {
            Token: sessionStorage.Token,
            FeeRate: this.state.FeeRate,
            Date: this.state.Date
        };

        await setTemporaryFeeRate(temporaryFeeRateData).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Temporary fee rate is set.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });


    }

    render() {
        const {
            FeeRate,
            Date,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`set-temporary-fee-rate-dialog`}
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
                                                <div className="type-h3 color-default p-t-n">{Dictionary.SetTemporaryFeeRate}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.TemporaryFeeRate}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="FeeRate" className="form-control" autoComplete="off"
                                                        value={FeeRate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.FeeRate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.DateUpTo}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="Date" className="form-control" autoComplete="off"
                                                        value={Date} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Date}</span>
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
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        SetTemporaryFeeRate: "تعيين معدل الرسوم المؤقتة",
        TemporaryFeeRate: "(٪) معدل الرسوم المؤقتة",
        DateUpTo: "التاريخ حتى",
        Set: "جلس",
        FeeRateError1: ".مطلوب معدل الرسوم",
        FeeRateError2: ".يمكن أن يكون معدل الرسوم بين 1 و 100",
        DateError1: ".التاريخ مطلوب",
        DateError2: ".يجب أن يكون التاريخ بعد يوم أمس",
    };
}
else {
    Dictionary = {
        SetTemporaryFeeRate: "Set Temporary Fee Rate",
        TemporaryFeeRate: "Temporary Fee Rate (%)",
        DateUpTo: "Date Up To",
        Set: "Set",
        FeeRateError1: "Fee rate is required.",
        FeeRateError2: "Fee Rate can be between 1 and 100.",
        DateError1: "Date is required.",
        DateError2: "Date must be later than yesterday.",
    };
}

export default SetTemporaryFeeRateDialog;