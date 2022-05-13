const countDown = () => {
    document.querySelectorAll("[autoCountdown]").forEach((el) => {
        const timer = new Timer(el.dataset.countdownDuration);

        const TIMER_FORMAT = el.dataset.countdownFormat;

        const countdownStep = new Timespan(el.dataset.countdownStep);

        // init
        el.innerHTML = moment
            .utc(timer.getRemainingSeconds()) // TODO custom formatter
            .format(TIMER_FORMAT);

        setInterval(() => {
            if (timer.getRemainingSeconds() <= 0) {
                window[el.dataset.countdownHandler]();
                return;
            }

            el.innerHTML = moment
                .utc(timer.getRemainingSeconds())
                .format(TIMER_FORMAT);
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
        // console.log(this.targetTimestamp - Date.now());
        return this.targetTimestamp - Date.now();
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
