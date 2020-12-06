import React, { Component } from "react";
import Strings from "../../res/strings";

class JobOfferContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const jobOffer = this.props.JobOffer;
        const createdHoursAgo = new Date() - new Date(jobOffer.TimeCreated) / 36e5;

        let loadingDate = new Date(jobOffer.LoadingDate);
        loadingDate.setHours((parseInt(jobOffer.LoadingTime.substring(0, 2))));
        loadingDate.setMinutes(parseInt(jobOffer.LoadingTime.substring(3, 5)));
        loadingDate.setSeconds(parseInt(jobOffer.LoadingTime.substring(6)));

       return <section>
           <div className="jumbotron theme-default">
               <div className="container">
                   <div className="col-md-24">
                       <div className="type-h3 color-default p-t-n">{(index ?
                           `${index + 1}. ${jobOffer.JobOfferType} ${Dictionary.JobOffer}` :
                           `${jobOffer.JobOfferType} ${Dictionary.JobOffer}`)}</div>
                       <div className="type-sh3">
                           <span className="fas fa-tag m-r-xxxs" style={{ color: "#606060" }}></span>{`${jobOffer.Price} ${Strings.SAUDI_RIYAL}`}</div>
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
                                       <div className="content-text-secondary">{jobOffer.LoadingPlace}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-map-marker-alt"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.UnloadingPlace}</div>
                                       <div className="content-text-secondary">{jobOffer.UnloadingPlace}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-map-signs"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.TripType}</div>
                                       <div className="content-text-secondary">{jobOffer.TripType}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-clock"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.AcceptedDelay}</div>
                                       <div className="content-text-secondary">{`${jobOffer.AcceptedDelay} Hour(s)`}</div>
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
                                       <div className="content-text-secondary">{jobOffer.CargoType}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-weight"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.CargoWeight}</div>
                                       <div className="content-text-secondary">{`${jobOffer.CargoWeight} KG.`}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
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
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-clock"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.LoadingTime}</div>
                                       <div className="content-text-secondary">{loadingDate.toLocaleTimeString()}</div>
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
                                       <div className="content-text-secondary">{(jobOffer.EntryExit === 1) ?
                                           <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                           <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                   </div>
                               </div>
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-cog"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">Permit Type</div>
                                       <div className="content-text-secondary">{jobOffer.PermitType === "" ? "Not Mentioned" : jobOffer.PermitType}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-plug"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.Available}</div>
                                       <div className="content-text-secondary">{(createdHoursAgo > 0 && createdHoursAgo < jobOffer.WaitingTime) ? 
                                           <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                           <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-calendar"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.PostedOn}</div>
                                       <div className="content-text-secondary">{new Date(jobOffer.TimeCreated).toDateString()}</div>
                                   </div>
                               </div>
                           </div>
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-clock"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.PostedAt}</div>
                                       <div className="content-text-secondary">{new Date(jobOffer.TimeCreated).toLocaleTimeString()}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div className="type-sh3">{Dictionary.Requirements}</div>

                   <div className="row">
                       <div className="col-md-8">
                       <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-flag"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.DriverNationalities}</div>
                                       <div className="content-text-secondary">{jobOffer.DriverNationalities}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-8">
                       <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-truck"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.TruckTypes}</div>
                                       <div className="content-text-secondary">{jobOffer.TruckTypes}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-8">
                       <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-weight"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">{Dictionary.TruckSizes}</div>
                                       <div className="content-text-secondary">{jobOffer.TruckSizes}</div>
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
        JobOffer: "عرض عمل",
        LoadingPlace: "مكان التحميل",
        UnloadingPlace: "مكان التفريغ",
        TripType: "نوع الرحلة",
        AcceptedDelay: "تأخير مقبول",
        CargoType: "نوع البضائع",
        CargoWeight: "وزن البضائع",
        LoadingDate: "تاريخ التحميل",
        LoadingTime: "وقت التحميل",
        EntryExit: "الدخول / الخروج",
        Available: "متاح",
        PostedOn: "نشر على",
        PostedAt: "نشر في",
        PermitType: "نوع التصريح",
        DriverNationalities: "جنسيات السائقين",
        TruckTypes: "أنواع الشاحنات",
        TruckSizes: "أحجام الشاحنات",
        Requirements: "المتطلبات",
    };
}
else {
    Dictionary = {
        JobOffer: "Job Offer",
        LoadingPlace: "Loading Place",
        UnloadingPlace: "Unloading Place",
        TripType: "Trip Type",
        AcceptedDelay: "Accepted Delay",
        CargoType: "Cargo Type",
        CargoWeight: "Cargo Weight",
        LoadingDate: "Loading Date",
        LoadingTime: "Loading Time",
        EntryExit: "Entry/Exit",
        Available: "Available",
        PostedOn: "Posted on",
        PostedAt: "Posted at",
        PermitType: "Permit Type",
        DriverNationalities: "Driver Nationalities",
        TruckTypes: "Truck Types",
        TruckSizes: "Truck Sizes",
        Requirements: "Requirements",
    };
}

export default JobOfferContainer;