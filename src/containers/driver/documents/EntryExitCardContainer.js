import React, { Component } from "react";

class EntryExitCardContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const entryExitCard = this.props.EntryExitCard;

        return entryExitCard ? <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.EntryExitCardSubtitle}</div>
                                <div className="row">
                                    <div className="col-md-24">
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-hashtag"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.EntryExitCard}</div>
                                                    <div class="content-text-secondary">{entryExitCard.EntryExitNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-cog"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.CardType}</div>
                                                    <div class="content-text-secondary">{entryExitCard.Type}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-calendar"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.ReleaseDate}</div>
                                                    <div class="content-text-secondary">{new Date(entryExitCard.ReleaseDate).toDateString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-hashtag"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">{Dictionary.NumberOfMonths}</div>
                                                    <div class="content-text-secondary">{entryExitCard.NumberOfMonths}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </section> : null;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        EntryExitCardSubtitle: "بطاقة الدخول / الخروج",
        CardType: "نوع البطاقة",
        ReleaseDate: "يوم الاصدار",
        NumberOfMonths: "عدد الأشهر",
    };
}
else {
    Dictionary = {
        EntryExitCardSubtitle: "Entry/Exit Card",
        EntryExitNumber: "Entry/Exit Number",
        CardType: "Card Type",
        ReleaseDate: "Release Date",
        NumberOfMonths: "Number of Months",
    };
}

export default EntryExitCardContainer;