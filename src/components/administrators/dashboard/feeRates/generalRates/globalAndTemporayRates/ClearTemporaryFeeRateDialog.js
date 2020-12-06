import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import { clearTemporaryFeeRate } from "../../../../AdministratorFunctions";

class ClearTemporaryFeeRateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onClear = this.onClear.bind(this);
    }

    onClear = async () => {
        this.setState({
            ShowPreloader: true
        });

        const clearedTemporaryFeeRate = {
            Token: sessionStorage.Token
        };

        await clearTemporaryFeeRate(clearedTemporaryFeeRate).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Temporary fee rate is cleared.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    };

    render() {
        const {
            ShowPreloader
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`clear-temporary-fee-rate-dialog`}
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
                            <div className="jumbotron theme-default" dir={GetDirection()}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-h3 color-default p-t-n">{Dictionary.ClearFeeRate}</div>
                                            <div className="type-sh3 m-b-xxs">{Dictionary.ClearFeeRateDetails}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-danger" onClick={this.onClear}>{Dictionary.Clear}</button>
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
        ClearFeeRate: "مسح معدل الرسوم المؤقتة",
        ClearFeeRateDetails: "هل أنت متأكد أنك تريد مسح سعر الرسوم المؤقتة قبل تاريخ استحقاقها؟",
        Clear: "واضح"
    };
}
else {
    Dictionary = {
        ClearFeeRate: "Clear Temporary Fee Rate",
        ClearFeeRateDetails: "Are you sure you want to clear temporary fee rate before its due date?",
        Clear: "Clear"
    };
}

export default ClearTemporaryFeeRateDialog;