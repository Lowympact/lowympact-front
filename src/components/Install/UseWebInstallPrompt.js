import { useState, useEffect } from "react";
import useShouldShowPrompt from "./UseShouldShowPrompt";

const webInstallPromptedAt = "webInstallPromptedAt";

const UseWebInstallPrompt = () => {
    const [installPromptEvent, setInstallPromptEvent] = useState();
    const [userShouldBePromptedToInstall, handleUserSeeingInstallPrompt] =
        useShouldShowPrompt(webInstallPromptedAt);

    const handleInstallDeclined = () => {
        handleUserSeeingInstallPrompt();
        setInstallPromptEvent(null);
    };

    const handleInstallAccepted = () => {
        // show native prompt
        prompt = localStorage.getItem("installPrompt");
        prompt.prompt();

        // decide what to do after the user chooses
        prompt.userChoice.then((choice) => {
            // if the user declined, we don't want to show the prompt again
            if (choice.outcome !== "accepted") {
                handleUserSeeingInstallPrompt();
            }
            localStorage.getItem("installPrompt", null);
        });
    };
    return [installPromptEvent, handleInstallDeclined, handleInstallAccepted];
};
export default UseWebInstallPrompt;
