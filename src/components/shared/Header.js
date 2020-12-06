import React, { Component } from "react";
import LanguageDispatcher from "../../res/LanguageDispatcher";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverLoggedIn: false,
            ShowDashboardButton: true
        };

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        
    }

    logOut = event => {
        event.preventDefault();

        if (sessionStorage.Token) {
            sessionStorage.removeItem("Token");
        }

        this.props.history.push("/login");
    }

    render() {
        const Language = LanguageDispatcher.GetLanguage();

        const loginRegisterLinks = <ul className="nav navbar-nav navbar-right">
            <li>
                <Link to="/register">{Language.Register}</Link>
            </li>
            <li>
                <Link to="/login"
                    onClick={() => {
                        this.setState({
                            ShowDashboardButton: false
                        });
                    }}>{Language.Login}</Link>
            </li>
        </ul>;

        const userLinks = <ul className="nav navbar-nav navbar-right">
            {this.state.ShowDashboardButton && 
                <li>
                <Link to="/administrators"
                    onClick={() => {
                        this.setState({
                            ShowDashboardButton: false
                        });
                    }}>{Language.Dashboard}</Link>
                </li>}
            <li>
                <Link to="" onClick={this.logOut.bind(this)}>{Language.Logout}</Link>
            </li>
        </ul>;
        return (
            <header>
                <nav className="navbar navbar-default">
                    <div className="navbar-local color-accent theme-dark">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                                    <span className="sr-only">Toggle navigation</span>
                                    <i className="glyph glyph-hamburger"></i>
                                </button>
                                <Link to="/" className="navbar-brand"
                                    onClick={() => {
                                        this.setState({
                                            ShowDashboardButton: true
                                        });
                                    }}>{Dictionary.NaqelAdministrators}</Link>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                                <ul className="nav navbar-nav"></ul>
                                {sessionStorage.Token ? userLinks : loginRegisterLinks}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        NaqelAdministrators: "ناقل اداريز"
    };
}
else {
    Dictionary = {
        NaqelAdministrators: "NAQEL ADMINISTRATORS"
    };
}

export default withRouter(Header);