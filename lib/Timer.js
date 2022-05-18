"use strict";

import Formatter from "./Formatter";

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
        return (this.targetTimestamp - Date.now()) / 1000;
    }

    getRemainingMilliSeconds() {
        return this.targetTimestamp - Date.now();
    }

    /**
     *
     * @param {string} format
     */
    getFormattedRemainingTime(format) {
        const formatter = new Formatter(this.getRemainingSeconds(), format);
        return formatter.get();
    }
}
