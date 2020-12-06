import React, { Component } from "react";
import IdentityCardContainer from "./IdentityCardContainer";
import CommercialRegisterCertificateContainer from "./CommercialRegisterCertificateContainer";
import SearchingContainer from "../../searching/SearchingContainer";
import { getPublicData } from "../../../components/shared/UserFunctions";

class DocumentsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TraderDocuments: null,
            Searching: false,
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        this.props.Refresh(this.refresh);
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {

            this.setState({
                Searching: true
            });

            let request = {
                Get: "TraderDocuments",
                Params: {
                    TraderID: this.props.TraderID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Trader documents found.") {
                    this.setState({
                        TraderDocuments: response.TraderDocuments,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TraderDocuments: null,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (sessionStorage.Token) {

            let request = {
                Get: "TraderDocuments",
                Params: {
                    TraderID: this.props.TraderID
                }
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Trader documents found.") {
                    this.setState({
                        TraderDocuments: response.TraderDocuments
                    });
                }
                else {
                    this.setState({
                        TraderDocuments: null
                    });
                }
            });
        }
    };

    render() {
        const traderDocuments = this.state.TraderDocuments;

        return (this.state.Searching || !traderDocuments) ?
            <SearchingContainer Searching={this.state.Searching}
                SearchingFor={Dictionary.Documents} /> :
            <section>
                <ol className="list-items" style={{ margin: "0px" }}>
                    <IdentityCardContainer IdentityCard={traderDocuments.IdentityCard} />
                    <CommercialRegisterCertificateContainer CommercialRegisterCertificate={traderDocuments.CommercialRegisterCertificate} />
                </ol>
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
        Documents: "مستندات"
    };
}
else {
    Dictionary = {
        Documents: "Documents"
    };
}

export default DocumentsContainer;