import React, { Component } from "react";
import LangugageDispatcher from "../../res/LanguageDispatcher";
import { Link } from "react-router-dom";

const Language = LangugageDispatcher.GetLanguage();

class Landing extends Component {
    render() {
        return <section dir={(!sessionStorage.Language || sessionStorage.Language === "English") ? "ltr" : "rtl"}>
            <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#00201C" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-md-push-12 text-center">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="admin.svg" src="./images/admin.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                        </div>
                        <div class="col-md-12 col-md-pull-12">
                            <div class="type-h3" style={{ color: "#008575", }}>{Dictionary.AdminAccounts}</div>
                            <div class="type-sh3" style={{ color: "#949496", }}>{Dictionary.SignupAndOrLogin}</div>
                            <p style={{ color: "#D1D2D4", }}>{Dictionary.AdminAccountsDetails}</p>
                            <div class="btn-group">
                                <Link to="/register" class="btn btn-secondary">{Language.Landing_Signup}</Link>
                                <Link to="/login" class="btn btn-primary">{Language.Landing_Login}</Link>
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
        AdminAccounts: "حسابات المشرف",
        SignupAndOrLogin: "الاشتراك و / أو تسجيل الدخول",
        AdminAccountsDetails: "هل انت نقل محترف؟ ما عليك سوى الاشتراك عن طريق ملء نماذج دقيقة و / أو تسجيل الدخول إلى حسابك. يمكن للمسؤولين مراقبة أنشطة السائقين والتجار والوسطاء. منحهم حق الوصول وعرض كشوف حساباتهم وفواتيرهم ، وإدارة معدلات الرسوم ، ودعم استفسارات المستخدمين ، وأكثر من ذلك بكثير ..."
    };
}
else {
    Dictionary = {
        AdminAccounts: "Admin Accounts",
        SignupAndOrLogin: "Signup and/or Login",
        AdminAccountsDetails: "Are you Naqel professional? Just signup by filling up precise forms and/or login to your account. Admins can montior Drivers', Traders', and Brokers' activities. Grant them access, view their account statements and bills, manage fee rates, support user queries, and much more..."
    };
}

export default Landing;