import React, { Component } from "react";

class PageNotFoundContainer extends Component {
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
                                alt="park.svg" src="./images/park.svg" data-source-index="2" />
                        </div>
                        <div className="col-md-20">
                            <div className="type-h3 color-default">404</div>
                            <div className="type-sh3 color-default">{Dictionary.PageNotFound}</div>
                            <div className="type-sh4">{Dictionary.Details}</div>
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
        PageNotFound: "الصفحة غير موجودة",
        Details: "هذه الصفحة غير موجودة. يرجى مراعاة أنك قد تعرض هذه الصفحة لأن الرمز المميز قد يكون منتهي الصلاحية. سيؤدي تسجيل الدخول إلى حسابك مرة أخرى إلى إصلاح المشكلة. يعتمد توفر الصفحات أيضًا على نوع المستخدم الذي قمت بتسجيل الدخول باسمه ، لذلك قد تعرض هذه الصفحة لأنك قمت بتسجيل الدخول كمستخدم مختلف."
    };
}
else {
    Dictionary = {
        PageNotFound: "Page Not Found",
        Details: "This page does not exist. Please consider that you might be viewing this page because your token might be expired. Logging in to your account again will fix the issue. Availability of pages also depends upon which type of user you are logged in as, so you might be viewing this page because you might be logged in as a different user."
    };
}

export default PageNotFoundContainer;