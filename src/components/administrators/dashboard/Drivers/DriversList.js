import React, { Component } from "react";
import { getData } from "../../AdministratorFunctions";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import ProgressRing from "../../../../controls/ProgressRing";
import DriverListItem from "./DriverListItem";
import PageHeading from "../../../../controls/PageHeading";

class DriversList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllDrivers: [],
            Drivers: [],
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
                Get: "Drivers"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Drivers found.") {
                    this.setState({
                        AllDrivers: response.Drivers,
                        Drivers: response.Drivers,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllDrivers: [],
                        Drivers: [],
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
                Drivers: this.state.AllDrivers
            });

            return;
        }

        const allDrivers = this.state.AllDrivers;
        let filteredDrivers = [];
        let count = 0;

        for (let driver of allDrivers) {
            if (driver.FirstName.includes(searchString) ||
                driver.LastName.includes(searchString) ||
                driver.Email.includes(searchString) ||
                driver.Username.includes(searchString)) {
                filteredDrivers[count++] = driver;
            }
        }

        this.setState({
            Drivers: filteredDrivers
        });
    }

    render() {
        const {
            Drivers,
            SearchString,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            {/* <PageHeading Heading="DRIVERS" /> */}
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-car m-r-xxs m-l-xxs"></span>{Dictionary.Drivers}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.NaqelDrivers}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>
            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder={Dictionary.SearchDriver}
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            {(Drivers.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.Drivers} /> :
                <ol className="list-items m-n">
                    {Drivers.map((driver, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <DriverListItem Index={index}
                                Driver={driver}
                                OnAccountActivated={driver => {
                                    let drivers = Drivers;

                                    for (let driverItem of drivers) {
                                        if (driverItem === driver) {
                                            driverItem.Active = true;
                                            break;
                                        }
                                    }

                                    this.setState({
                                        Drivers: drivers
                                    });

                                }}
                                OnAccountBlocked={(driver, isBlocked) => {
                                    let drivers = Drivers;

                                    for (let driverItem of drivers) {
                                        if (driverItem === driver) {
                                            driverItem.IsBlocked = isBlocked;
                                            break;
                                        }
                                    }

                                    this.setState({
                                        Drivers: drivers
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
        Drivers: "السائقين",
        NaqelDrivers: "سائقي النقل",
        SearchDriver: "ابحث عن سائق"
    };
}
else {
    Dictionary = {
        Drivers: "Drivers",
        NaqelDrivers: "Naqel Drivers",
        SearchDriver: "Search a Driver"
    };
}

export default DriversList;