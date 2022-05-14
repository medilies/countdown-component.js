"use strict";

import { Tick } from "./Tick";
import { Timer } from "./Timer";

export class Countdown {
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
