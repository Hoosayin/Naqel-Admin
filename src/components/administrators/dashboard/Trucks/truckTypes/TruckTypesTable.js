import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import TruckTypeRow from "./TruckTypeRow";
import AddTruckTypeDialog from "./AddTruckTypeDialog";
import { getPublicData } from "../../../../shared/UserFunctions";

class TruckTypesTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TruckTypes: [],
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
                Get: "TruckTypes"
            };

            this.setState({
                Searching: true
            });

            await getPublicData(request).then(response => {
                if (response.Message === "Truck types found.") {
                    this.setState({
                        TruckTypes: response.TruckTypes,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TruckTypes: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            TruckTypes,
            Searching,
            Refreshing
        } = this.state;

        const ShowDeleteButton = TruckTypes.length > 1 ? true : false;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-truck m-r-xxs m-l-xxs"></span>{Dictionary.TruckTypes}</div>
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#add-truck-type-dialog`}>{Dictionary.AddNew}</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddTruckTypeDialog OnOK={async () => { await this.onComponentUpdated(); }} />

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.TruckTypes}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            {(TruckTypes.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.TruckTypes} /> :
                <div class="table-responsive back-color-gray" style={{ height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Number}</th>
                                <th>{Dictionary.Type}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {TruckTypes.map((truckType, index) => {
                                return <TruckTypeRow key={index}
                                    Index={index}
                                    TruckType={truckType}
                                    ShowDeleteButton={ShowDeleteButton}
                                    OnTruckTypeDeleted={async () => { await this.onComponentUpdated(); }} />;
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
        TruckTypes: "أنواع الشاحنات",
        AddNew: "اضف جديد",
        WaitingTimes: "أوقات الانتظار",
        Number: "رقم",
        Type: "اكتب"
    };
}
else {
    Dictionary = {
        TruckTypes: "Truck Types",
        AddNew: "Add New",
        Number: "NUMBER",
        Type: "TYPE"
    };
}

export default TruckTypesTable;