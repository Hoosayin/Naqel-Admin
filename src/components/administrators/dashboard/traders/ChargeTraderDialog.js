import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { chargeTrader } from "../../AdministratorFunctions";

class ChargeTraderDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onCharge = this.onCharge.bind(this);
    }

    onCharge = async () => {
        this.setState({
            ShowPreloader: true
        });

        const chargedTrader = {
            Token: sessionStorage.Token,
            TraderID: this.props.Trader.TraderID
        };

        await chargeTrader(chargedTrader).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Trader is charged.") {
                this.cancelButton.click();
                this.props.OnOK();

                const {
                    Trader
                } = this.props;

                let phoneNumber = Trader.PhoneNumber.replace("+", "");
                let message = `Hi ${Trader.FirstName} ${Trader.LastName}! Your account has been removed form Exonerated Traders. Now, you will be charged. ~ Team NAQEL`;
                message = message.replace(" ", "%20");

                window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, "_blank");
            }
        });
    };

    render() {
        const {
            ShowPreloader
        } = this.state;

        const {
            Index,
            Trader
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`charge-trader-dialog-${Index}`}
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
                                            <div className="type-h3 color-default p-t-n">{Dictionary.ChargeTrader}</div>
                                            <div className="type-sh3 m-b-xxs" dir={GetDirection()}>{Dictionary.AreYouSure}
                                                <span className="color-default">{` ${Trader.FirstName} ${Trader.LastName}`}</span>? {Dictionary.OnCharging}.</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-primary" onClick={this.onCharge}>{Dictionary.Charge}</button>
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
    return (!LLanguage || LLanguage === "English") ? "ltr" : "rtl";
};

const LLanguage = sessionStorage.Language;
let Dictionary;

if (LLanguage === "Arabic") {
    Dictionary = {
        ChargeTrader: "تاجر المسؤول",
        AreYouSure: "هل أنت متأكد من أنك تريد شحن",
        OnCharging: "عند الشحن ، سيتم إزالة هذا التاجر من القائمة المبرئة",
        Charge: "الشحنة",
    };
}
else {
    Dictionary = {
        ChargeTrader: "Charge Trader",
        AreYouSure: "Are you sure you want to charge",
        OnCharging: "On charging will remove this trader from exonerated list",
        Charge: "Charge",
    };
}

export default ChargeTraderDialog;