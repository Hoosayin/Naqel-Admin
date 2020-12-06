import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/shared/Header";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import SetupAdministratorAccount from "./components/register/SetupAdministratorAccount";
import Congratulations from "./components/register/Congratulations";
import AdministratorsDashboard from "./components/administrators/dashboard/AdministratorsDashboard";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import RecoverPassword from "./components/forgotPassword/RecoverPassword";
import PasswordRecovered from "./components/forgotPassword/PasswordRecovered";
import BackToTop from "./controls/BackToTop";
import Footer from "./components/shared/Footer";

class App extends Component {
    render() {
        return <Router basename="/">
            <div className="App">
                <Header />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/setupAdministratorAccount" component={SetupAdministratorAccount} />
                <Route exact path="/congratulations" component={Congratulations} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route exact path="/recoverPassword" component={RecoverPassword} />
                <Route exact path="/passwordRecovered" component={PasswordRecovered} />
                <Route exact path="/administrators" component={AdministratorsDashboard} />
                <BackToTop />
                <Footer />
            </div>
        </Router>;
    }
}

export default App;