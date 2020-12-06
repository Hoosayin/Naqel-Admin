import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addTraderRate } from "../../../AdministratorFunctions";

class AddTraderRateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Username: "",
            FeeRate: "",

            ValidUsername: false,
            ValidFeeRate: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Username: "",
                FeeRate: ""
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
        let ValidUsername = this.state.ValidUsername
        let ValidFeeRate = this.state.ValidFeeRate;

        switch (field) {
            case "Username":
                ValidUsername = (value !== "");
                Errors.Username = ValidUsername ? "" : Dictionary.UsernameError1;

                if (Errors.Username != "") {
                    break;
                }

                ValidUsername = (value.match(/^[a-z0-9]+$/i));
                Errors.Username = ValidUsername ? "" : Dictionary.UsernameError2;
                break;
            case "FeeRate":
                ValidFeeRate = (value !== "");
                Errors.FeeRate = ValidFeeRate ? "" : Dictionary.FeeRateError1;

                if (Errors.FeeRate !== "") {
                    break;
                }

                ValidFeeRate = (value >= 1 && value <= 100);
                Errors.FeeRate = ValidFeeRate ? "" : Dictionary.FeeRateError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidUsername: ValidUsername,
            ValidFeeRate: ValidFeeRate,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidUsername &&
                        this.state.ValidFeeRate
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

        const newTraderRate = {
            Token: sessionStorage.Token,
            Username: this.state.Username,
            FeeRate: this.state.FeeRate
        };

        await addTraderRate(newTraderRate).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Trader rate is added.") {
                this.cancelButton.click();
                this.props.OnOK(response.TraderRate);
            }
        });
    }

    render() {
        const {
            Username,
            FeeRate,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-trader-rate-dialog`}
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
                                                <div className="type-h3 color-default p-t-n m-b-xxs">{Dictionary.AddTraderRate}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.TradersUsername}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Username" className="form-control" autoComplete="off"
                                                        value={Username} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Username}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.FeeRate}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="FeeRate" className="form-control" autoComplete="off"
                                                        value={FeeRate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.FeeRate}</span>
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
        AddTraderRate: "أضف سعر التاجر",
        TradersUsername: "اسم مستخدم التاجر",
        FeeRate: "(٪) معدل الرسوم",
        Add: "أضف",
        FeeRateError1: ".مطلوب معدل الرسوم",
        FeeRateError2: ".يمكن أن يكون معدل الرسوم بين 1 و 100",
        UsernameError1: ".اسم المستخدم مطلوب",
        UsernameError2: ".إسم المستخدم غير صحيح"
    };
}
else {
    Dictionary = {
        AddTraderRate: "Add Trader Rate",
        TradersUsername: "Trader's Username",
        FeeRate: "Fee Rate (%)",
        Add: "Add",
        FeeRateError1: "Fee rate is required",
        FeeRateError2: "Fee Rate can be between 1 and 100.",
        UsernameError1: "Username is required.",
        UsernameError2: "Username is invalid."
    };
}

export default AddTraderRateDialog;