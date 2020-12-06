import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { unblockDriverAccount } from "../../AdministratorFunctions";

class UnblockAccountDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false,
        };

        this.onUnblock = this.onUnblock.bind(this);
    }

    onUnblock = async () => {
        this.setState({
            ShowPreloader: true
        });

        const unblockedDriver = {
            Token: sessionStorage.Token,
            DriverID: this.props.Driver.DriverID
        };

        await unblockDriverAccount(unblockedDriver).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Driver account is unblocked.") {
                this.cancelButton.click();
                this.props.OnOK();

                const {
                    Driver
                } = this.props;

                let phoneNumber = Driver.PhoneNumber.replace("+", "");
                let message = `Hi ${Driver.FirstName} ${Driver.LastName}! Your account has been unblocked. You can continue to use are services by now. ~ Team NAQEL`;
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
            Driver
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`unblock-account-dialog-${Index}`}
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
                                            <div className="type-h3 color-default p-t-n">{Dictionary.UnblockDriver}</div>
                                            <div className="type-sh3 m-b-xxs" dir={GetDirection()}>{Dictionary.AreYouSure}
                                                <span className="color-default">{` ${Driver.FirstName} ${Driver.LastName}`}</span>.</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-primary" onClick={this.onUnblock}>{Dictionary.Unblock}</button>
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
        UnblockDriver: "سائق فك الحظر",
        AreYouSure: "هل أنت متأكد أنك تريد إلغاء الحظر",
        Unblock: "رفع الحظر",
    };
}
else {
    Dictionary = {
        UnblockDriver: "Unblock Driver",
        AreYouSure: "Are you sure you want to unblock",
        Unblock: "Unblock",
    };
}

export default UnblockAccountDialog;