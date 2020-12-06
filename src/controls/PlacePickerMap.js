import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import Strings from "../res/strings";

const geocoder = new window.google.maps.Geocoder;

const Map = props => {
    const [LoadingPlace, SetLoadingPlace] = useState(props.LoadingPlace);
    const [UnloadingPlace, SetUnloadingPlace] = useState(props.UnloadingPlace);

    const {
        OnLoadingPlacePicked,
        OnUnloadingPlacePicked
    } = props;

    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 24.630820, lng: 46.728230 }}
        options={{ streetViewControl: false }}>

        <Marker
            position={LoadingPlace ? { lat: LoadingPlace.Lat, lng: LoadingPlace.Lng } : { lat: 24.630820, lng: 46.728230 }}
            draggable={true}
            onDragEnd={async coordinates => {
                const lat = parseFloat(coordinates.latLng.lat());
                const lng = parseFloat(coordinates.latLng.lng());

                const latLng = { lat: lat, lng: lng }

                geocoder.geocode({ "location": latLng }, function (results, status) {
                    let place;

                    if (status === "OK") {
                        place = results[0] ? results[0].formatted_address : "Cannot resolve address.";
                    } else {
                        place = `Geocoder failed due to: ${status}.`;
                    }

                    const loadingPlace = {
                        Lat: latLng.lat,
                        Lng: latLng.lng,
                        Place: place
                    };

                    SetLoadingPlace(loadingPlace);
                    OnLoadingPlacePicked(loadingPlace);
                });
            }}
            name="Loading Place"
            icon={{
                url: "./images/source.svg",
                scaledSize: new window.google.maps.Size(40, 40)
            }}
        />

        <Marker
            position={UnloadingPlace ? { lat: UnloadingPlace.Lat, lng: UnloadingPlace.Lng } : { lat: 24.630820, lng: 46.728230 }}
            draggable={true}
            onDragEnd={async coordinates => {
                const lat = parseFloat(coordinates.latLng.lat());
                const lng = parseFloat(coordinates.latLng.lng());

                const latLng = { lat: lat, lng: lng }

                geocoder.geocode({ "location": latLng }, function (results, status) {
                    let place;

                    if (status === "OK") {
                        place = results[0] ? results[0].formatted_address : "Cannot resolve address.";
                    } else {
                        place = `Geocoder failed due to: ${status}.`;
                    }

                    const unloadingPlace = {
                        Lat: latLng.lat,
                        Lng: latLng.lng,
                        Place: place
                    };

                    SetUnloadingPlace(unloadingPlace);
                    OnUnloadingPlacePicked(unloadingPlace);

                });
            }}
            name="Loading Place"
            icon={{
                url: "./images/destination.svg",
                scaledSize: new window.google.maps.Size(40, 40)
            }}
        />
    </GoogleMap>;
}

const MapWrapped = withGoogleMap(Map);

const PlacePickerMap = props => {
    return <div style={{ width: "100%", height: "100vh" }}>
        <MapWrapped
            //googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Strings.GOOGLE_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            LoadingPlace={props.LoadingPlace}
            UnloadingPlace={props.UnloadingPlace}
            OnLoadingPlacePicked={props.OnLoadingPlacePicked}
            OnUnloadingPlacePicked={props.OnUnloadingPlacePicked} />
    </div>;
}

export default PlacePickerMap;