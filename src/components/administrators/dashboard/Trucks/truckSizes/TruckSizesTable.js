import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import TruckSizeRow from "./TruckSizeRow";
import AddTruckSizeDialog from "./AddTruckSizeDialog";
import { getPublicData } from "../../../../shared/UserFunctions";

class TruckSizesTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TruckSizes: [],
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
                Get: "TruckSizes"
            };

            this.setState({
                Searching: true
            });

            await getPublicData(request).then(response => {
                if (response.Message === "Truck sizes found.") {
                    this.setState({
                        TruckSizes: response.TruckSizes,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TruckSizes: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            TruckSizes,
            Searching,
            Refreshing
        } = this.state;

        const ShowDeleteButton = TruckSizes.length > 1 ? true : false;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-truck m-r-xxs m-l-xxs"></span>{Dictionary.TruckSizes}</div>
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#add-truck-size-dialog`}>{Dictionary.AddNew}</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddTruckSizeDialog OnOK={async () => { await this.onComponentUpdated(); }} />

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.TruckSizes}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            {(TruckSizes.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.TruckSizes} /> :
                <div class="table-responsive back-color-gray" style={{ height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Number}</th>
                                <th>{Dictionary.Size}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {TruckSizes.map((truckSize, index) => {
                                return <TruckSizeRow key={index}
                                    Index={index}
                                    TruckSize={truckSize}
                                    ShowDeleteButton={ShowDeleteButton}
                                    OnTruckSizeDeleted={async () => { await this.onComponentUpdated(); }} />;
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
        TruckSizes: "أحجام الشاحنات",
        AddNew: "اضف جديد",
        Number: "رقم",
        Size: "بحجم"
    };
}
else {
    Dictionary = {
        TruckSizes: "Truck Sizes",
        AddNew: "Add New",
        Number: "NUMBER",
        Size: "SIZE"
    };
}

export default TruckSizesTable;