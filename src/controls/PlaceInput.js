import React, { Component } from "react";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

class PlaceInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Address: this.props.Address
        };

        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onChange = address => {
        this.setState({
            Address: address
        });
    };

    onSelect = address => {
        this.setState({
            Address: address
        });

        geocodeByAddress(address).then(results => {
            const location = results[0].geometry.location;
            const lat = location.lat();
            const lng = location.lng()

            const place = {
                Address: address,
                Lat: lat ? lat : 0.0,
                Lng: lng ? lng : 0.0,
            };

            this.props.OnPlaceSelected(place);
        });
    };

    render() {
        const {
            Address
        } = this.state;

        return <PlacesAutocomplete
            value={Address}
            onChange={this.onChange}
            onSelect={this.onSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <div className="form-group m-n">
                        <input value={Address} {...getInputProps({
                            placeholder: "Search Places...",
                            className: "form-control m-n",
                        })} />
                    </div>

                    <div className="autocomplete-dropdown-container" style={{ maxWidth: "296px", minWidth: "88px" }}>
                        {loading && <div className="suggestion-item p-xxxs">Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? "suggestion-item--active p-xxxs"
                                : "suggestion-item p-xxxs";

                            const style = suggestion.active
                                ? { backgroundColor: "#EBEBEB", cursor: "pointer" }
                                : { backgroundColor: "#FEFEFE", cursor: "pointer" };

                            return <div
                                {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                })}>
                                <span>{suggestion.description}</span>
                            </div>;
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>;
    }
};

export default PlaceInput;