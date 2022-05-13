const countDown = () => {
    document.querySelectorAll("[autoCountdown]").forEach((el) => {
        const TARGET_TIMESTAMP = targetTimestamp(el.dataset.countdownDuration);

        const TIMER_FORMAT = el.dataset.countdownFormat;

        const COUNTDOWN_STEP_SECONDS = (function () {
            const COUNTDOWN_STEP = new Timespan(el.dataset.countdownStep);
            return COUNTDOWN_STEP.getTotalSeconds();
        })();

        let remainingMilliSeconds = TARGET_TIMESTAMP - Date.now();

        // init
        el.innerHTML = moment.utc(remainingMilliSeconds).format(TIMER_FORMAT);

        setInterval(() => {
            remainingMilliSeconds = TARGET_TIMESTAMP - Date.now();

            if (remainingMilliSeconds <= 0) {
                window[el.dataset.countdownHandler]();
                return;
            }

            remainingMilliSeconds =
                remainingMilliSeconds < 0 ? 0 : remainingMilliSeconds;

            el.innerHTML = moment
                .utc(remainingMilliSeconds)
                .format(TIMER_FORMAT);
        }, COUNTDOWN_STEP_SECONDS * 1000);
    });
};

/**
 *
 * @param {number} remainingSeconds
 * @returns
 */
function targetTimestamp(remainingSeconds) {
    return Date.now() + parseInt(remainingSeconds) * 1000;
}

/**
 *
 */
class Timespan {
    constructor(timespanStr) {
        this.timespanStr = timespanStr;

        this.setParsedTimespanComposers();
        this.setTotalSeconds();
        this.consolelog();
    }

    setParsedTimespanComposers() {
        const HMS = this.timespanStr.match(
            /(?:(?<h>\d{0,2})h)?(?:(?<m>\d{0,2})m)?(?:(?<s>\d{0,2})s)?/
        );

        this.hours = parseInt(HMS.groups.h) || 0;
        this.minutes = parseInt(HMS.groups.m) || 0;
        this.seconds = parseInt(HMS.groups.s) || 0;
    }

    setTotalSeconds() {
        this.totalSeconds =
            this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

    getTotalSeconds() {
        return this.totalSeconds;
    }

    consolelog() {
        console.log({
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
        });
    }
}

countDown();
