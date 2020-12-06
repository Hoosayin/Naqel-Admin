import React, { Component } from "react";

class BlockedUserContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            BlockedUser
        } = this.props;

        return <section>
            <div className="jumbotron" style={{ height: "100vh" }} dir={GetDirection()}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="sad.svg" src="./images/sad.svg" data-source-index="2" />
                        </div>
                        <div className="col-md-20">
                            <div className="type-h3 color-default">{`${BlockedUser.FirstName} ${BlockedUser.LastName}, ${Dictionary.YourAccountBlocked}!`}</div>
                            <div className="type-sh3">{Dictionary.UpTo}: <span className="color-default">{new Date(BlockedUser.BlockDate).toDateString()}</span></div>
                            <div className="type-sh4">{Dictionary.Details}.</div>
                            <p><span className="color-default">{Dictionary.Reason}: </span>{BlockedUser.Reason}</p>
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
        YourAccountBlocked: "تم حظر حسابك",
        UpTo: "يصل إلى",
        Details: "لا يمكنك استخدام خدمات ناقل حتى يتم إلغاء حظرها. تعرف على السبب وراء حظر فريقنا لحسابك",
        Reason: "السبب",
    };
}
else {
    Dictionary = {
        YourAccountBlocked: "Your Account Has Been Blocked",
        UpTo: "UP TO",
        Details: "You cannot use Naqel's services until it is unblocked. See the reason, why our team has blocked your account",
        Reason: "REASON",
    };
}

export default BlockedUserContainer;