import React, { Component } from "react";
import Strings from "../../res/strings";

class CompletedJobContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const completedJob = this.props.CompletedJob;

        let loadingDate = new Date(completedJob.LoadingDate);
        loadingDate.setHours((parseInt(completedJob.LoadingTime.substring(0, 2))));
        loadingDate.setMinutes(parseInt(completedJob.LoadingTime.substring(3, 5)));
        loadingDate.setSeconds(parseInt(completedJob.LoadingTime.substring(6)));

        let jobHours = parseInt(Math.abs(new Date(completedJob.Created) - loadingDate) / 36e5);

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                            {index != null && index >= 0 ? `${index + 1}.` : Dictionary.Job}
                            {index === 0 ? <span class="badge back-color-golden m-l-xxs">{Dictionary.Latest}</span> : null}
                        </div>
                        <div className="type-sh3">
                            <span className="fas fa-tag m-r-xxs" style={{ color: "#606060" }}></span>{`${completedJob.Price.toFixed(2)} ${Strings.SAUDI_RIYAL}`}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                            <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.LoadingPlace}</div>
                                        <div className="content-text-secondary">{completedJob.LoadingPlace}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.UnloadingPlace}</div>
                                        <div className="content-text-secondary">{completedJob.UnloadingPlace}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-hashtag"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.JobNumber}</div>
                                        <div className="content-text-secondary">{completedJob.JobNumber}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-signs"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.TripType}</div>
                                        <div className="content-text-secondary">{completedJob.TripType}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.AcceptedDelay}</div>
                                        <div className="content-text-secondary">{`${completedJob.AcceptedDelay} Hour(s)`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                            <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-id-badge"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.EntryExit}</div>
                                        <div className="content-text-secondary">{completedJob.EntryExit ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-box"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CargoType}</div>
                                        <div className="content-text-secondary">{completedJob.CargoType}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-weight"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CargoWeight}</div>
                                        <div className="content-text-secondary">{`${completedJob.CargoWeight} KG.`}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.LoadingDate}</div>
                                        <div className="content-text-secondary">{loadingDate.toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.LoadingTime}</div>
                                        <div className="content-text-secondary">{loadingDate.toTimeString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-hourglass"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CompletedIn}</div>
                                        <div className="content-text-secondary">{jobHours}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CompletedOn}</div>
                                        <div className="content-text-secondary">{new Date(completedJob.Created).toDateString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CompletedAt}</div>
                                        <div className="content-text-secondary">{new Date(completedJob.Created).toTimeString()}</div>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Job: "مهنة",
        Latest: "آخر",
        CargoDelivered: "تم تسليم أصناف البضائع:",
        To: "إلى",
        JobNumber: "رقم الوظيفة",
        LoadingPlace: "مكان التحميل",
        UnloadingPlace: "مكان التفريغ",
        TripType: "نوع الرحلة",
        AcceptedDelay: "تأخير مقبول",
        EntryExit: "الدخول / الخروج",
        CargoType: "نوع البضائع",
        CargoWeight: "وزن البضائع",
        LoadingDate: "تاريخ التحميل",
        LoadingTime: "وقت التحميل",
        CompletedIn: "(مكتمل في (ساعات",
        CompletedOn: "اكتمل في",
        CompletedAt: "اكتمل في",
    };
}
else {
    Dictionary = {
        Job: "Job",
        Latest: "LATEST",
        CargoDelivered: "Cargo Items were Delivered:",
        To: "to",
        LoadingPlace: "Loading Place",
        UnloadingPlace: "Unloading Place",
        JobNumber: "Job Number",
        TripType: "Trip Type",
        AcceptedDelay: "Accepted Delay",
        EntryExit: "Entry/Exit",
        CargoType: "Cargo Type",
        CargoWeight: "Cargo Weight",
        LoadingDate: "Loading Date",
        LoadingTime: "Loading Time",
        CompletedIn: "Completed In (Hours)",
        CompletedOn: "Completed on",
        CompletedAt: "Completed at",
    };
}

export default CompletedJobContainer;