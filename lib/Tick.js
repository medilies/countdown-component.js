"use strict";

export default class Tick {
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
