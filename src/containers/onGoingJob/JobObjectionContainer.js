import React, { Component } from "react";

class JobObjectionContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            JobObjection
        } = this.props;

        let createdOn = new Date(JobObjection.Created);
        let objectionBy = JobObjection.ObjectionBy;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="type-h5 color-default p-t-n">{`${Index + 1}.`}</div>
                    <div className="entity-list">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-user"></span>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">
                                    {objectionBy.Type === "Driver" ? 
                                        <span className="fas fa-car m-r-xxxs"></span> : 
                                        <span className="fas fa-briefcase m-r-xxxs"></span>}
                                    {`${objectionBy.FirstName} ${objectionBy.LastName}`}
                                </div>
                                <div className="content-text-secondary">{objectionBy.Username}</div>
                                <div className="content-text-secondary">{`${Dictionary.PostedOn} ${createdOn.toDateString()}.`}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-thumbs-down"></span>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.Objection}</div>
                                <div className="content-text-secondary">{Dictionary.Reason}: {JobObjection.Reason}</div>
                                <div className="content-text-secondary">{`${Dictionary.Comment}: ${JobObjection.Comment}`}</div>
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
        Objection: "اعتراض",
        PostedOn: "نشر على",
        Reason: "السبب",
        Comment: "تعليق"
    };
}
else {
    Dictionary = {
        Objection: "Objection",
        PostedOn: "Posted on",
        Reason: "Reason",
        Comment: "Comment"
    };
}

export default JobObjectionContainer;