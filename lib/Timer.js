"use strict";

export default class Timer {
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
