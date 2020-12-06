import React, { Component } from "react";
import Strings from "../../res/strings";

class JobRequestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const jobRequest = this.props.JobRequest;
        const createdHoursAgo = Math.abs(new Date() - new Date(jobRequest.TimeCreated)) / 36e5;

       return <section>
           <div className="jumbotron theme-default">
               <div className="container">
                   <div className="col-md-24">
                       <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{index ? `${index + 1}.` : Dictionary.JobRequest}</div>
                       <div className="type-sh3">
                           <span className="fas fa-tag m-r-xxxs" style={{ color: "#606060" }}></span>{`${jobRequest.Price} ${Strings.SAUDI_RIYAL}`}
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-12">
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-map-marker-alt"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">{Dictionary.LoadingPlace}</div>
                                       <div class="content-text-secondary">{jobRequest.LoadingPlace}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-map-marker-alt"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">{Dictionary.UnloadingPlace}</div>
                                       <div class="content-text-secondary">{jobRequest.UnloadingPlace}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-map-signs"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">{Dictionary.TripType}</div>
                                       <div class="content-text-secondary">{jobRequest.TripType}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-12">
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-plug"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">{Dictionary.Available}</div>
                                       <div class="content-text-secondary">{(createdHoursAgo < jobRequest.WaitingTime) ? 
                                           <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                           <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-calendar"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">{Dictionary.PostedOn}</div>
                                       <div class="content-text-secondary">{new Date(jobRequest.TimeCreated).toDateString()}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-clock"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">{Dictionary.PostedAt}</div>
                                       <div class="content-text-secondary">{new Date(jobRequest.TimeCreated).toLocaleTimeString()}</div>
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
        JobRequest: "طلب وظيفة",
        LoadingPlace: "مكان التحميل",
        UnloadingPlace: "مكان التفريغ",
        TripType: "نوع الرحلة",
        Available: "متاح",
        PostedOn: "نشر على",
        PostedAt: "نشر في"
    };
}
else {
    Dictionary = {
        JobRequest: "Job Request",
        LoadingPlace: "Loading Place",
        UnloadingPlace: "Unloading Place",
        TripType: "Trip Type",
        Available: "Available",
        PostedOn: "Posted on",
        PostedAt: "Posted at"
    };
}

export default JobRequestContainer;