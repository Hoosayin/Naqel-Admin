import NodeGeocoder from "node-geocoder";
import Strings from "./strings.js"

const Geocoder = NodeGeocoder({
    provider: "google",
    apiKey: Strings.GOOGLE_API_KEY,
    formatter: null
});

export default Geocoder;

