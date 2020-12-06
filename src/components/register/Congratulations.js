import React, { Component } from "react";
import { CongratulationsCardBack, CardXLarge } from "../../styles/CardStyles";

class EmailConfirmation extends Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = event => {
        event.preventDefault();
        sessionStorage.removeItem("IsCreatedSuccessfully");
        this.props.history.push("/login");
    }

    render() {
        if (!sessionStorage.IsCreatedSuccessfully) {
            this.props.history.push("/register");
            return <a />
        }
        else {
            return <div class="middle" style={CongratulationsCardBack}>
                <div class="jumbotron theme-default animated fadeIn" style={CardXLarge}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="congrats.svg" src="./images/congrats.png" data-source-index="2" style={{ maxWidth: "70%" }} />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">{Dictionary.Congratulations}</div>
                                <div class="type-sh3">{Dictionary.CongratulationsSubtitle}</div>
                                <br />
                                <form noValidate onSubmit={this.onSubmit}>
                                    <input type="submit" value={Dictionary.SignIn} class="btn btn-primary" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        }
    }
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Congratulations: "تهانينا",
        CongratulationsSubtitle: "تم إنشاء حسابك بنجاح.",
        SignIn: "تسجيل الدخول"
    };
}
else if (Language === "Urdu") {
    Dictionary = {
        Congratulations: "مبارک ہو",
        CongratulationsSubtitle: "آپ کا اکاؤنٹ کامیابی کے ساتھ تشکیل دے دیا گیا ہے۔",
        SignIn: "سائن ان"
    };
}
else {
    Dictionary = {
        Congratulations: "Congratulations",
        CongratulationsSubtitle: "Your account has been created successfully.",
        SignIn: "Sign In"
    };
}

export default EmailConfirmation;