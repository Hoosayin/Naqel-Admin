import React, { Component } from "react";

class TraderRequestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const traderRequest = this.props.TraderRequest;

        return <section>
            <div className="jumbotron">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3 color-default p-t-n">{Dictionary.TraderRequest}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-box"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CargoType}</div>
                                        <div className="content-text-secondary">{traderRequest.CargoType}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-weight"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CargoWeight}</div>
                                        <div className="content-text-secondary">{`${traderRequest.CargoWeight} KG.`}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-id-badge"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.EntryExit}</div>
                                        <div className="content-text-secondary">{(traderRequest.EntryExit === 1) ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.LoadingDate}</div>
                                        <div className="content-text-secondary">{new Date(traderRequest.LoadingDate).toDateString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.LoadingTime}</div>
                                        <div className="content-text-secondary">{traderRequest.LoadingTime}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.AcceptedDelay}</div>
                                        <div className="content-text-secondary">{`${traderRequest.AcceptedDelay} Hour(s)`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.RequestedOn}</div>
                                        <div className="content-text-secondary">{new Date(traderRequest.Created).toDateString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.RequestedAt}</div>
                                        <div className="content-text-secondary">{new Date(traderRequest.Created).toTimeString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        TraderRequest: "طلب التاجر",
        AcceptedDelay: "تأخير مقبول",
        CargoType: "نوع البضائع",
        CargoWeight: "وزن البضائع",
        LoadingDate: "تاريخ التحميل",
        LoadingTime: "وقت التحميل",
        EntryExit: "الدخول / الخروج",
        RequestedOn: "مطلوب على",
        RequestedAt: "مطلوب في"
    };
}
else {
    Dictionary = {
        TraderRequest: "Trader Request",
        AcceptedDelay: "Accepted Delay",
        CargoType: "Cargo Type",
        CargoWeight: "Cargo Weight",
        LoadingDate: "Loading Date",
        LoadingTime: "Loading Time",
        EntryExit: "Entry/Exit",
        RequestedOn: "Requested on",
        RequestedAt: "Requested at"
    };
}

export default TraderRequestContainer;