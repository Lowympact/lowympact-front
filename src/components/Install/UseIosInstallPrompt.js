import useShouldShowPrompt from "./UseShouldShowPrompt";

const iosInstallPromptedAt = "iosInstallPromptedAt";

const isIOS = () => {
    // @ts-ignore
    if (navigator.standalone) {
        //user has already installed the app
        return false;
    }
    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    return isIPad || isIPhone;
};

const UseIosInstallPrompt = () => {
    const [userShouldBePromptedToInstall, handleUserSeeingInstallPrompt] =
        useShouldShowPrompt(iosInstallPromptedAt);

    return [isIOS() && userShouldBePromptedToInstall, handleUserSeeingInstallPrompt];
};
export default UseIosInstallPrompt;
