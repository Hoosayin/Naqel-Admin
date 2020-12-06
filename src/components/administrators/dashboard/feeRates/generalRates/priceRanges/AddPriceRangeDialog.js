import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import { addPriceRange } from "../../../../AdministratorFunctions";

class AddPriceRangeDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            StartRange: "",
            EndRange: "",
            FeeRate: "",

            ValidStartRange: false,
            ValidEndRange: false,
            ValidFeeRate: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                StartRange: "",
                EndRange: "",
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
        let ValidStartRange = this.state.ValidStartRange;
        let ValidEndRange = this.state.ValidEndRange;
        let ValidFeeRate = this.state.ValidFeeRate;

        switch (field) {
            case "StartRange":
                ValidStartRange = (value !== "");
                Errors.StartRange = ValidStartRange ? "" : Dictionary.StartingPriceError1;

                if (Errors.StartRange !== "") {
                    break;
                }

                if (this.state.EndRange !== "") {
                    ValidStartRange = (value <= parseFloat(this.state.EndRange));
                    Errors.StartRange = ValidStartRange ? "" : Dictionary.StartingPriceError2;

                    if (Errors.StartRange !== "") {
                        break;
                    }

                }

                ValidEndRange = (parseFloat(this.state.EndRange) >= value);
                Errors.EndRange = ValidEndRange ? "" : Dictionary.EndingPriceError2;
                break;
            case "EndRange":
                ValidEndRange = (value !== "");
                Errors.EndRange = ValidEndRange ? "" : Dictionary.EndingPriceError1;

                if (Errors.EndRange !== "") {
                    break;
                }

                ValidEndRange = (value >= parseFloat(this.state.StartRange));
                Errors.EndRange = ValidEndRange ? "" : Dictionary.EndingPriceError2;

                if (Errors.EndRange !== "") {
                    break;
                }

                ValidStartRange = (parseFloat(this.state.StartRange) <= value);
                Errors.StartRange = ValidStartRange ? "" : Dictionary.StartingPriceError2;
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
            ValidStartRange: ValidStartRange,
            ValidEndRange: ValidEndRange,
            ValidFeeRate: ValidFeeRate,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidStartRange &&
                        this.state.ValidEndRange &&
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

        const newPriceRange = {
            Token: sessionStorage.Token,
            StartRange: this.state.StartRange,
            EndRange: this.state.EndRange,
            FeeRate: this.state.FeeRate
        };

        await addPriceRange(newPriceRange).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Price range is added.") {
                this.cancelButton.click();
                this.props.OnOK(response.PriceRange);
            }
        });
    }

    render() {
        const {
            StartRange,
            EndRange,
            FeeRate,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-price-range-dialog`}
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
                                                <div className="type-h3 color-default p-t-n m-b-xxs">{Dictionary.AddPriceRange}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.StartingPrice}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0" name="StartRange"
                                                        className="form-control" autoComplete="off" value={StartRange} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.StartRange}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.EndingPrice}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0" name="EndRange"
                                                        className="form-control" autoComplete="off" value={EndRange} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.EndRange}</span>
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
        AddPriceRange: "إضافة نطاق السعر",
        StartingPrice: "(السعر المبدئي (ريال",
        EndingPrice: "(السعر النهائي (ريال",
        FeeRate: "(٪) معدل الرسوم",
        Add: "أضف",
        StartingPriceError1: ".السعر المبدئي مطلوب",
        StartingPriceError2: ".يجب أن يكون السعر المبدئي أقل من السعر النهائي",
        EndingPriceError1: ".مطلوب السعر النهائي",
        EndingPriceError2: ".يجب أن يكون السعر النهائي أكبر من السعر المبدئي",
        FeeRateError1: ".مطلوب معدل الرسوم",
        FeeRateError2: ".يمكن أن يكون معدل الرسوم بين 1 و 100",
    };
}
else {
    Dictionary = {
        AddPriceRange: "Add Price Range",
        StartingPrice: "Starting Price (SR)",
        EndingPrice: "Ending Price (SR)",
        FeeRate: "Fee Rate (%)",
        Add: "Add",
        StartingPriceError1: "Starting price is required.",
        StartingPriceError2: "Starting price must be less than Ending price.",
        EndingPriceError1: "Ending price is required.",
        EndingPriceError2: "Ending price must be greater than Starting price.",
        FeeRateError1: "Fee rate is required.",
        FeeRateError2: "Fee Rate can be between 1 and 100.",
    };
}

export default AddPriceRangeDialog;