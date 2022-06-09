import Countdown from "./Countdown";

const autoStartCountown = () => {
    document.querySelectorAll("[autoCountdown]").forEach((el) => {
        new Countdown(el);
    });
};

export default autoStartCountown;
