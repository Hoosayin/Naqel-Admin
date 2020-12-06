import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ProgressBar from "../../../../../../../controls/ProgressBar";
import AccountStatementData from "./AccountStatementData";
import { getData } from "../../../../../AdministratorFunctions";

class AccountStatement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AccountStatement: null,
            Searching: false,
            Refreshing: false
        };

        this.onSearch = this.onSearch.bind(this);
    }

    async componentDidMount() {
        this.props.OnSearch(this.onSearch);
    }

    onSearch = async username => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "DriverAccountStatement",
                Params: {
                    Username: username
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Account statement found.") {
                    this.setState({
                        AccountStatement: response.AccountStatement,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AccountStatement: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            AccountStatement,
            Searching,
        } = this.state;

        return (Searching || !AccountStatement) ?
            <section>
                <div className="jumbotron theme-default" style={{ height: "100vh" }} dir={GetDirection()}>
                    <div className="container">
                        {Searching ? <div className="text-center p-xxs">
                            <div className="type-h4 color-default">{Dictionary.Searching}</div>
                            <ProgressBar />
                        </div> : <div className="text-center p-xxs">
                                <div className="type-h4"><span className="fas fa-search m-r-xxs m-l-xxs"></span>{Dictionary.NoAccountStatementFound}.</div>
                            </div>}
                    </div>
                </div>
            </section> :
            <section>
                <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary m-n">{Dictionary.Print}</button>}
                        content={() => this.DriverAccountStatement} />
                </div>
                <AccountStatementData AccountStatement={AccountStatement}
                    ref={driverAccountStatement => (this.DriverAccountStatement = driverAccountStatement)} />
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
        Searching: "يبحث",
        NoAccountStatementFound: "لا يوجد بيان حساب لعرضه. ابحث في السائق عن طريق اسم المستخدم لعرض كشف حسابه",
        Print: "طباعة",
    };
}
else {
    Dictionary = {
        Searching: "Searching",
        NoAccountStatementFound: "No account statement to display. Search the driver by username to view his account statement",
        Print: "Print",
    };
}

export default AccountStatement;