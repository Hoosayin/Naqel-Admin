import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import PermitTypeRow from "./PermitTypeRow";
import AddPermitTypeDialog from "./AddPermitTypeDialog";
import { getPublicData } from "../../../../shared/UserFunctions";

class PermitTypesTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PermitTypes: [],
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
                Get: "PermitTypes"
            };

            this.setState({
                Searching: true
            });

            await getPublicData(request).then(response => {
                if (response.Message === "Permit types found.") {
                    this.setState({
                        PermitTypes: response.PermitTypes,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        PermitTypes: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            PermitTypes,
            Searching,
            Refreshing
        } = this.state;

        const ShowDeleteButton = PermitTypes.length > 1 ? true : false;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-cog m-r-xxs m-l-xxs"></span>{Dictionary.PermitTypes}</div>
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#add-permit-type-dialog`}>{Dictionary.AddNew}</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddPermitTypeDialog OnOK={async () => { await this.onComponentUpdated(); }} />

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.PermitTypes}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            {(PermitTypes.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.PermitTypes} /> :
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
                            {PermitTypes.map((permitType, index) => {
                                return <PermitTypeRow key={index}
                                    Index={index}
                                    PermitType={permitType}
                                    ShowDeleteButton={ShowDeleteButton}
                                    OnPermitTypeDeleted={async () => { await this.onComponentUpdated(); }} />;
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
        PermitTypes: "أنواع التصاريح",
        AddNew: "اضف جديد",
        Number: "رقم",
        Type: "اكتب"
    };
}
else {
    Dictionary = {
        PermitTypes: "Permit Types",
        AddNew: "Add New",
        Number: "NUMBER",
        Type: "TYPE"
    };
}

export default PermitTypesTable;