"use strict";

export default class Formatter {
    /**
     *
     * @param {number} duration Interger in seconds
     * @param {string} format
     */
    constructor(duration, format) {
        this.duration = duration;
        this.format = format;

        this.mapper = {
            d: 24 * 60 * 60,
            hh: 60 * 60,
            h: 60 * 60,
            mm: 60,
            m: 60,
            ss: 1,
            s: 1,
        };
    }

    get(format = this.format) {
        this.format = format;

        for (const [key, value] of Object.entries(this.mapper)) {
            if (this._formatHas(key)) {
                this._replace(key);
            }
        }

        return this.format;
    }

    /**
     *
     * @param {string} key
     * @returns {boolean}
     */
    _formatHas(key) {
        return this.format.indexOf(key) !== -1;
    }

    _replace(key) {
        let value = Math.floor(this.duration / this.mapper[key]);

        if (key.length === 2 && value < 10) value = "0" + value;

        this.duration -= value * this.mapper[key];

        this.format = this.format.replace(key, value);
    }
}
