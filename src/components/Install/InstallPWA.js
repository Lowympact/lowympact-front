import React from "react";
import useIosInstallPrompt from "./UseIosInstallPrompt";
import useWebInstallPrompt from "./UseWebInstallPrompt";
import "./InstallPWA.css";

const InstallPWA = () => {
    const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
    const [webInstallPrompt, handleWebInstallDeclined, handleWebInstallAccepted] =
        useWebInstallPrompt();

    // if (!iosInstallPrompt && !webInstallPrompt) {
    //     return null;
    // }
    return (
        <div className="install-popup">
            <div className="install-popup-wrapper">
                <img
                    className="mx-auto"
                    style={{
                        borderTopRightRadius: "50%",
                        borderTopLeftRadius: "50%",
                        backgroundColor: "#fff",
                        marginTop: "-50px",
                    }}
                    width="100px"
                    src="pwa-512x512.png"
                    alt="Icon"
                />
                <div>
                    {iosInstallPrompt && (
                        <>
                            <div className="text-center">
                                <h3>Téléchargez l'application</h3>
                            </div>
                            <div className="text-center">
                                Cliquez sur {"  "}
                                <span className="material-icons">ios_share</span>
                                {"  "}puis &quot;Ajouter à l'écran d'accueil&quot;
                            </div>
                            <div className="button-dissmiss">
                                <button onClick={handleIOSInstallDeclined}>Pas maintenant</button>
                            </div>
                        </>
                    )}
                    {webInstallPrompt && (
                        <>
                            <div className="text-center">
                                <h3>Ne passez plus à côté des alternatives durables</h3>
                            </div>
                            <div className="android-wrapper">
                                <button
                                    className="install-button"
                                    onClick={handleWebInstallAccepted}
                                >
                                    Installer l'application
                                </button>
                                <button
                                    className="dont-install-button"
                                    onClick={handleWebInstallDeclined}
                                >
                                    Pas maintenant
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstallPWA;
