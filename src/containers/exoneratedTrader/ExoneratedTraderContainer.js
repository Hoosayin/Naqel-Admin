import React, { Component } from "react";

class BlockedUserContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            ExoneratedTrader
        } = this.props;

        return <section>
            <div className="jumbotron" style={{ height: "100vh" }} dri={GetDirection()}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="sad.svg" src="./images/sad.svg" data-source-index="2" />
                        </div>
                        <div className="col-md-20">
                            <div className="type-h3 color-default">{`${ExoneratedTrader.FirstName} ${ExoneratedTrader.LastName}, ${Dictionary.YourAccountExonerated}!`}</div>
                            <div className="type-sh3">{Dictionary.UpTo}: <span className="color-default">{new Date(ExoneratedTrader.ExonerateDate).toDateString()}</span></div>
                            <div className="type-sh4">{Dictionary.Details}</div>
                            <p><span className="color-default">{Dictionary.Reason}: </span>{ExoneratedTrader.Reason}</p>
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
        YourAccountExonerated: "لقد تم تبرئتك",
        UpTo: "يصل إلى",
        Details: "لا يمكنك استخدام خدمات ناقل أثناء تبرئتك. انظر إلى السبب وراء تبرئة فريقنا لك.",
        Reason: "السبب",
    };
}
else {
    Dictionary = {
        YourAccountExonerated: "You have been exonerated",
        UpTo: "UP TO",
        Details: "You cannot use Naqel's services while you are exonerated. See the reason, why our team has exonerated you.",
        Reason: "REASON",
    };
}

export default BlockedUserContainer;