import React, { Component } from "react";
import CountryList from "iso-3166-country-list";

class NationalitySelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Nationality: this.props.Nationality
        };
    }

    render() {
        const {
            Nationality
        } = this.state;

        const {
            Width,
            OnNationalitySelected
        } = this.props;

        return <div class="combobox">
            <select class="form-control"
                style={{
                    width: Width ? Width : "100%",
                    maxWidth: "296px",
                    minWidth: "88px"
                }}
                onChange={event => {
                    const nationality = event.target.value;

                    this.setState({
                        Nationality: nationality
                    }, () => {
                        OnNationalitySelected(nationality);
                    });
                }}>
                {CountryList.names.map((name, index) => {
                    return <option key={index} value={name} selected={Nationality === name ? true : false} >{name}</option>;
                })}
            </select>
        </div>;
    }
};

export default NationalitySelector;