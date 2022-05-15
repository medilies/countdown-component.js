const { Countdown } = require("./Countdown");

global.autoStartCountown = () => {
    document.querySelectorAll("[autoCountdown]").forEach((el) => {
        new Countdown(el);
    });
};
