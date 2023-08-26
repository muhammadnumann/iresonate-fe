import React from "react";
import './button.less'
const FancyButton = ({ children }) => {

    const buttonStyle = {
        width: 178,
        height: 50
    };
    const fancyFrontStyle = {
        transform:
            "rotateX(0deg) translateZ(" + 50 / 2 + "px )"
    };
    const fancyBackStyle = {
        transform:
            "rotateX(90deg) translateZ( " +
            50 / 2 +
            "px )"
    };
    return (
        <div
            className="fancy-button"
            style={buttonStyle}
        >
            <div className="fancy-flipper">
                <div className="fancy-front" style={fancyFrontStyle}>
                    <div className="sign-up-btn-back">
                        {children}
                    </div>
                </div>
                <div className="fancy-back" style={fancyBackStyle}>
                    <div className="sign-up-btn mt-0 w-100">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );

}


export default FancyButton;
