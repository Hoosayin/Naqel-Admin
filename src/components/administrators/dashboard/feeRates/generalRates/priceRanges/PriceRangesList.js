import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import PriceRangeListItem from "./PriceRangeListItem";
import AddPriceRangeDialog from "./AddPriceRangeDialog";
import { getData } from "../../../../AdministratorFunctions";

class PriceRangesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PriceRanges: [],
            Searching: false,
            Refreshing: false
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "PriceRanges"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Price ranges found.") {
                    this.setState({
                        PriceRanges: response.PriceRanges,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        PriceRanges: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            PriceRanges,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.PriceRanges}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-primary"
                    data-toggle="modal"
                    data-target={`#add-price-range-dialog`}>{Dictionary.AddNewRange}</button>
            </div>

            <AddPriceRangeDialog OnOK={priceRange => {
                let priceRanges = PriceRanges;
                priceRanges.push(priceRange);

                this.setState({
                    PriceRanges: priceRanges
                });
            }} />

            {(PriceRanges.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.PriceRanges} /> :
                <div class="table-responsive back-color-gray">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Number}</th>
                                <th>{Dictionary.StartingPrice}</th>
                                <th>{Dictionary.EndingPrice}</th>
                                <th>{Dictionary.FeeRate}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {PriceRanges.map((priceRange, index) => {
                                return <PriceRangeListItem key={index}
                                    Index={index}
                                    PriceRange={priceRange}
                                    OnPriceRangeUpdated={feeRate => {
                                        let priceRanges = PriceRanges;

                                        for (let priceRangeItem of priceRanges) {
                                            if (priceRangeItem === priceRange) {
                                                priceRange.FeeRate = feeRate;
                                                break;
                                            }
                                        }

                                        this.setState({
                                            PriceRanges: priceRanges
                                        });
                                    }}
                                    OnPriceRangeDeleted={priceRange => {
                                        let priceRanges = [];

                                        for (let priceRangeItem of PriceRanges) {
                                            if (priceRangeItem !== priceRange) {
                                                priceRanges.push(priceRangeItem);
                                            }
                                        }

                                        this.setState({
                                            PriceRanges: priceRanges
                                        });
                                    }} />;
                            })}
                        </tbody>
                    </table>
                </div>}
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
        PriceRanges: "يتراوح السعر",
        AddNewRange: "إضافة نطاق جديد",
        Number: "رقم",
        StartingPrice: "سعر البدء",
        EndingPrice: "السعر النهائي",
        FeeRate: "معدل الرسوم",
    };
}
else {
    Dictionary = {
        PriceRanges: "Price Ranges",
        AddNewRange: "Add New Range",
        Number: "NUMBER",
        StartingPrice: "STARTING PRICE",
        EndingPrice: "ENDING PRICE",
        FeeRate: "FEE RATE",
    };
}

export default PriceRangesList;