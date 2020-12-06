import React, { Component } from "react";
import LanguageDispatcher from "../../res/LanguageDispatcher";

const Language = LanguageDispatcher.GetLanguage();

const LinkStyle = {
    textDecoration: "none",
    cursor: "pointer"
};

class Footer extends Component {
    render() {
        return <footer className="border-top footer theme-default color-bg-light-neutral-high text-light">
            <div className="container">
                &copy; {new Date().getFullYear()} - {Language.ApplicationName} - <a style={LinkStyle}
                    onClick={() => {
                        LanguageDispatcher.SetLanguage("English");
                        window.location.reload(false);
                    }}>English</a> | <a style={LinkStyle}
                    onClick={() => {
                        LanguageDispatcher.SetLanguage("Arabic");
                        window.location.reload(false);
                    }}>العربية</a>
            </div>
        </footer>;
    }
};

export default Footer;