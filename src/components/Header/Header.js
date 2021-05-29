import "./Header.css";
import logo from "../../assets/images/logo.svg";
import blob from "../../assets/images/bitmap.png";
import React from "react";

function Header(props) {
    return (
        <div>
            <div>
                <img src={blob} className="blob-top" alt="Blob" />
            </div>
            {props.history ? (
                <React.Fragment />
            ) : (
                <React.Fragment>
                    <div>
                        <img src={blob} className="blob-left" alt="Blob" />
                    </div>
                    <div>
                        <img src={blob} className="blob-right" alt="Blob" />
                    </div>{" "}
                </React.Fragment>
            )}
            <div className="header-container">
                <img src={logo} className="header-logo" alt="Logo" />
                <span>Lowympact</span>
            </div>
        </div>
    );
}

export default Header;
