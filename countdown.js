const startAutoCountown = () => {
    document.querySelectorAll("[autoCountdown]").forEach((el) => {
        new Countdown(el);
    });
};

/**
 *
 */
class Countdown {
    /**
     *
     * @param {HTMLElement} el
     */
    constructor(el) {
        this.timer = new Timer(el.getAttribute("countdown-duration"));
        this.tick = new Tick(el.getAttribute("countdown-tick-size") || "1s");
        this.element = el;
        this.actionName = el.getAttribute("countdown-handler");
        this.format = el.getAttribute("countdown-format");

        // init
        this.render();

        setInterval(() => {
            if (this.timer.getRemainingSeconds() <= 0) {
                this.actionName ? window[this.actionName]() : "do nothing";
                return;
            }

            this.render();
        }, this.tick.getSizeInMilliSeconds());
    }

    render() {
        this.element.innerHTML = this.timer.getFormattedRemainingTime(
            this.format
        );
    }

    // TODO
    abort() {}
}

/**
 *
 */
class Timer {
    /**
     *
     * @param {number} duration in seconds
     */
    constructor(duration) {
        this.duration = duration;

        this._setTargetTimestamp();
    }

    /**
     *
     * @param {number} remainingSeconds
     */
    _setTargetTimestamp() {
        this.targetTimestamp = Date.now() + parseInt(this.duration) * 1000;
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
class Tick {
    /**
     *
     * @param {string} timespanStr [<two-digits>h][<two-digits>m][<two-digits>s]
     */
    constructor(timespanStr) {
        this.timespanStr = timespanStr.toLowerCase();

        this._parseTimespan();
        this._setTotalSeconds();
    }

    _parseTimespan() {
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

    getSizeInMilliSeconds() {
        return this.totalSeconds * 1000;
    }
}

startAutoCountown();
