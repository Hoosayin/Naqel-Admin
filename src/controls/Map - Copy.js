import React, { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";
const Key = "AIzaSyD_U_2NzdPIL7TWb8ECBHWO1eROR2yrebI";

const Directions = () => {
    const [Directions, SetDirections] = useState(null);

    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: 33.784310, lng: 72.738780 };
    const destination = { lat: 33.684422, lng: 73.047882 };

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
        console.log("Hello");
        console.log(result);
        console.log(status);

        if (status === window.google.maps.DirectionsStatus.OK) {
            SetDirections(result);
        } else {
            console.error(`error fetching directions ${result}`);
        }
    });

    var Dir = new window.google.maps.DirectionsRenderer({ suppressMarkers: true });

    return <DirectionsRenderer directions={Directions} options={{
        suppressMarkers: true
    }} />;
};

const Map = () => {
    const [SelectedJobOffer, SetSelectedPark] = useState(null);

    return <GoogleMap
        defaultZoom={10}>
        <Marker key={1} position={{ lat: 33.784310, lng: 72.738780 }}
            icon={{
                url: "./images/sad.svg",
                scaledSize: new window.google.maps.Size(30, 30)
            }}
            onClick={() => {
                SetSelectedPark(true);
            }} />

        {SelectedJobOffer ? <InfoWindow position={{ lat: 33.784310, lng: 72.738780 }}
            onCloseClick={() => {SetSelectedPark(null);
            }}>
            <div>Job Offer Details</div>
        </InfoWindow> : null}

        <Directions />
    </GoogleMap>;
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const MyGoogleMap = () => {
    return <div style={{ width: "100%", height: "400px" }}>
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Key}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />} />
    </div>;
}

export default MyGoogleMap;