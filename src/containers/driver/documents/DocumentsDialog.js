import React, { Component } from "react";
import { getPublicData } from "../../../components/shared/UserFunctions";
import SearchingContainer from "../../searching/SearchingContainer"; 
import DrivingLicenceContainer from "./DrivingLicenceContainer";
import EntryExitCardContianer from "./EntryExitCardContainer";
import IdentityCardContainer from "./IdentityCardContainer";

class DocumentsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverDocuments: null,
            Searching: false,
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {

            this.setState({
                Searching: true
            });

            let request = {
                Get: "DriverDocuments",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Driver documents found.") {
                    this.setState({
                        DriverDocuments: response.DriverDocuments,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        DriverDocuments: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const driverDocuments = this.state.DriverDocuments;

        return <section>
            <div className="modal modal-center-vertical" id={`documents-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            <div className="type-h2" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.Documents}</div>
                        </div>
                        <div className="modal-body">
                            {(this.state.Searching || !driverDocuments) ?
                                <SearchingContainer Searching={this.state.Searching}
                                    SearchingFor={Dictionary.Documents} /> :
                                <ol className="list-items" style={{ margin: "0px" }}>
                                    <IdentityCardContainer IdentityCard={driverDocuments.IdentityCard} />
                                    <DrivingLicenceContainer DrivingLicence={driverDocuments.DrivingLicence} />
                                    <EntryExitCardContianer EntryExitCard={driverDocuments.EntryExitCard} />
                                </ol>}
                        </div>
                    </div>
                </div>
            </div>
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
        Documents: "مستندات",
    };
}
else {
    Dictionary = {
        Documents: "Documents",
    };
}

export default DocumentsDialog;