const countDown = () => {
    document.querySelectorAll("[autoCountdown]").forEach((el) => {
        const timer = new Timer(el.dataset.countdownDuration);

        const TIMER_FORMAT = el.dataset.countdownFormat;

        const countdownStep = new Timespan(el.dataset.countdownStep || "1s");

        // init
        el.innerHTML = timer.getFormattedRemainingTime(TIMER_FORMAT);

        setInterval(() => {
            if (timer.getRemainingSeconds() <= 0) {
                el.dataset.countdownHandler
                    ? window[el.dataset.countdownHandler]()
                    : "do nothing";
                return;
            }

            el.innerHTML = timer.getFormattedRemainingTime(TIMER_FORMAT);
        }, countdownStep.getTotalMilliSeconds());
    });
};

/**
 *
 */
class Timer {
    /**
     *
     * @param {number} initDuration in seconds
     */
    constructor(initDuration) {
        this.initDuration = initDuration;

        this._setTargetTimestamp();
    }

    /**
     *
     * @param {number} remainingSeconds
     */
    _setTargetTimestamp() {
        this.targetTimestamp = Date.now() + parseInt(this.initDuration) * 1000;
    }

    getRemainingSeconds() {
        return this.targetTimestamp - Date.now();
    }

    /**
     *
     * @param {string} format
     */
    getFormattedRemainingTime(format) {
        const remainingTimeDate = new Date(this.getRemainingSeconds());

        const formatter = {
            d: remainingTimeDate.getDate(), // Day of the month without leading zeros  1 to 31
            // n: remainingTimeDate.getMonth() + 1, // Numeric representation of a month, without leading zeros  1 through 12
            // Y: remainingTimeDate.getFullYear(), // A full numeric representation of a year, at least 4 digits  1999 or 2003

            hh:
                remainingTimeDate.getHours() < 10
                    ? "0" + remainingTimeDate.getHours()
                    : remainingTimeDate.getHours(),
            h: remainingTimeDate.getHours(),

            mm:
                remainingTimeDate.getMinutes() < 10
                    ? "0" + remainingTimeDate.getMinutes()
                    : remainingTimeDate.getMinutes(),
            m: remainingTimeDate.getMinutes(),

            ss:
                remainingTimeDate.getSeconds() < 10
                    ? "0" + remainingTimeDate.getSeconds()
                    : remainingTimeDate.getSeconds(),
            s: remainingTimeDate.getSeconds(),

            // v: remainingTimeDate.getMilliseconds(), // Milliseconds. Same note applies as for u.
        };

        for (const [key, value] of Object.entries(formatter)) {
            format = format.replaceAll(key, value);
        }

        return format;
    }
}

/**
 *
 */
class Timespan {
    /**
     *
     * @param {string} timespanStr [<two-digits>h][<two-digits>m][<two-digits>s]
     */
    constructor(timespanStr) {
        this.timespanStr = timespanStr.toLocaleLowerCase();

        this._setParsedTimespanComposers();
        // this._consolelog();
        this._setTotalSeconds();
    }

    _setParsedTimespanComposers() {
        const HMS = this.timespanStr.match(
            /(?:(?<h>\d{0,2})h)?(?:(?<m>\d{0,2})m)?(?:(?<s>\d{0,2})s)?/
        );

        this.hours = parseInt(HMS.groups.h) || 0;
        this.minutes = parseInt(HMS.groups.m) || 0;
        this.seconds = parseInt(HMS.groups.s) || 0;
    }

    _setTotalSeconds() {
        this.totalSeconds =
            this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

    getTotalSeconds() {
        return this.totalSeconds;
    }

    getTotalMilliSeconds() {
        return this.totalSeconds * 1000;
    }

    _consolelog() {
        console.log({
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
        });
    }
}

countDown();
