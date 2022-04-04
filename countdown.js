document.querySelectorAll("[autoCountdown]").forEach((t) => {
    let o = parseInt(t.dataset.countdownDuration);
    const n = t.dataset.countdownFormat;
    let e = (function () {
        const o = t.dataset.countdownStep.match(
            /(?:(?<h>\d{0,2})h)?(?:(?<m>\d{0,2})m)?(?:(?<s>\d{0,2})s)?/
        );
        return (
            (o.groups.h ? 3600 * parseInt(o.groups.h) : 0) +
            (o.groups.m ? 60 * parseInt(o.groups.m) : 0) +
            (o.groups.s ? parseInt(o.groups.s) : 0)
        );
    })();
    (t.innerHTML = moment.utc(1e3 * o).format(n)),
        setInterval(() => {
            (o -= e),
                o <= 0
                    ? window[t.dataset.countdownHandler]()
                    : ((o = o < 0 ? 0 : o),
                      (t.innerHTML = moment("1970-01-01")
                          .startOf("day")
                          .seconds(o)
                          .format(n)));
        }, 1e3 * e);
});
