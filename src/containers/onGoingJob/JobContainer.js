import React, { Component } from "react";

class JobContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const onGoingJob = this.props.OnGoingJob;

        let loadingDate = new Date(onGoingJob.LoadingDate);
        loadingDate.setHours((parseInt(onGoingJob.LoadingTime.substring(0, 2))));
        loadingDate.setMinutes(parseInt(onGoingJob.LoadingTime.substring(3, 5)));
        loadingDate.setSeconds(parseInt(onGoingJob.LoadingTime.substring(6)));

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                            {(index !== null && (index >= 0)) ? `${index + 1}. ${Dictionary.JobDetails}` : Dictionary.JobDetails}
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
                                        <div className="content-text-secondary">{onGoingJob.LoadingPlace}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.UnloadingPlace}</div>
                                        <div className="content-text-secondary">{onGoingJob.UnloadingPlace}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-signs"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.TripType}</div>
                                        <div className="content-text-secondary">{onGoingJob.TripType}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.AcceptedDelay}</div>
                                        <div className="content-text-secondary">{`${onGoingJob.AcceptedDelay} Hour(s)`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-box"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CargoType}</div>
                                        <div className="content-text-secondary">{onGoingJob.CargoType}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-weight"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.CargoWeight}</div>
                                        <div className="content-text-secondary">{`${onGoingJob.CargoWeight} KG.`}</div>
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
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.LoadingTime}</div>
                                        <div className="content-text-secondary">{loadingDate.toTimeString()}</div>
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
                                        <div className="content-text-primary">{Dictionary.EntryExit}t</div>
                                        <div className="content-text-secondary">{(onGoingJob.EntryExit === 1) ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.StartedOn}</div>
                                        <div className="content-text-secondary">{new Date(onGoingJob.Created).toDateString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.StartedAt}</div>
                                        <div className="content-text-secondary">{new Date(onGoingJob.Created).toTimeString()}</div>
                                    </div>
                                </div>
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-hashtag"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">{Dictionary.JobNumber}</div>
                                        <div className="content-text-secondary">{onGoingJob.JobNumber}</div>
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
        JobDetails: "تفاصيل الوظيفة",
        LoadingPlace: "مكان التحميل",
        UnloadingPlace: "مكان التفريغ",
        TripType: "نوع الرحلة",
        AcceptedDelay: "تأخير مقبول",
        CargoType: "نوع البضائع",
        CargoWeight: "وزن البضائع",
        LoadingDate: "تاريخ التحميل",
        LoadingTime: "وقت التحميل",
        EntryExit: "الدخول / الخروج",
        StartedOn: "بدأ في",
        StartedAt: "بدأت في",
        JobNumber: "رقم الوظيفة"
    };
}
else {
    Dictionary = {
        JobDetails: "Job Details",
        LoadingPlace: "Loading Place",
        UnloadingPlace: "Unloading Place",
        TripType: "Trip Type",
        AcceptedDelay: "Accpeted Delay",
        CargoType: "Cargo Type",
        CargoWeight: "Cargo Weight",
        LoadingDate: "Loading Date",
        LoadingTime: "Loading Time",
        EntryExit: "Entry/Exit",
        StartedOn: "Started on",
        StartedAt: "Started at",
        JobNumber: "Job Number"
    };
}

export default JobContainer;