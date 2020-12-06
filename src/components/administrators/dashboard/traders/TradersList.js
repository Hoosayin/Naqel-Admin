import React, { Component } from "react";
import { getData } from "../../AdministratorFunctions";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import ProgressRing from "../../../../controls/ProgressRing";
import TraderListItem from "./TraderListItem";
import PageHeading from "../../../../controls/PageHeading";

class TradersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllTraders: [],
            Traders: [],
            SearchString: "",
            Searching: false,
            Refreshing: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "Traders"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Traders found.") {
                    this.setState({
                        AllTraders: response.Traders,
                        Traders: response.Traders,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllTraders: [],
                        Traders: [],
                        Searching: false
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();

        const searchString = this.state.SearchString;

        if (searchString === "") {
            this.setState({
                Traders: this.state.AllTraders
            });

            return;
        }

        const allTraders = this.state.AllTraders;
        let filteredTraders = [];
        let count = 0;

        for (let trader of allTraders) {
            if (trader.FirstName.includes(searchString) ||
                trader.LastName.includes(searchString) ||
                trader.Email.includes(searchString) ||
                trader.Username.includes(searchString)) {
                filteredTraders[count++] = trader;
            }
        }

        this.setState({
            Traders: filteredTraders
        });
    }

    render() {
        const {
            Traders,
            SearchString,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            {/* <PageHeading Heading="TRADERS" /> */}
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-briefcase m-r-xxs m-l-xxs"></span>{Dictionary.TradersAndBrokers}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.NaqelTradersandBrokers}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder={Dictionary.Search}
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            {(Traders.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.TradersAndBrokers} /> :
                <ol className="list-items m-n">
                    {Traders.map((trader, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <TraderListItem Index={index}
                                Trader={trader}
                                OnRefundRateSet={(trader, refundRate) => {
                                    let traders = Traders;

                                    for (let traderItem of traders) {
                                        if (traderItem === trader) {
                                            traderItem.TraderRefundRate = refundRate;
                                            break;
                                        }
                                    }

                                    this.setState({
                                        Traders: traders
                                    });
                                }}
                                OnTraderExonerated={(trader, isExonerated) => {
                                    let traders = Traders;

                                    for (let traderItem of traders) {
                                        if (traderItem === trader) {
                                            traderItem.IsExonerated = isExonerated;
                                            break;
                                        }
                                    }

                                    this.setState({
                                        Traders: traders
                                    });
                                }} />
                        </li>;
                    })}
                </ol>}
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
        TradersAndBrokers: "التجار والوسطاء",
        NaqelTradersandBrokers: "ناقيل للتجار والوسطاء",
        Search: "بحث",    
    };
}
else {
    Dictionary = {
        TradersAndBrokers: "Traders and Brokers",
        NaqelTradersandBrokers: "Naqel Traders and Brokers",
        Search: "Search",    
    };
}

export default TradersList;