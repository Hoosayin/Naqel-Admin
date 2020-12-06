import English from "./English";
import Urdu from "./Urdu";
import Arabic from "./Arabic";

const setLanguage = language => {
    sessionStorage.setItem("Language", language);
};

const getLanguage = () => {
    if (sessionStorage.Language) {
        const language = sessionStorage.Language;

        if (language === "Arabic") {
            return Arabic;
        }
        else if (language === "Urdu") {
            return Urdu;
        }
        else {
            return English;
        }

    }
    else {
        return English;
    }
};

const LanugageDispatcher = {
    SetLanguage: setLanguage,
    GetLanguage: getLanguage
};

export default LanugageDispatcher;