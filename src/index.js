import { Countdown } from "./Countdown";

const startAutoCountown = () => {
    document.querySelectorAll("[autoCountdown]").forEach((el) => {
        new Countdown(el);
    });
};

startAutoCountown();
