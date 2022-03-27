document.querySelectorAll("[CountDown]").forEach((el) => {
    let remainingTime = parseInt(el.dataset.countdownDuration);
    const timerFormat = el.dataset.countdownFormat;
    let countdownStep = (function () {
        const countdownStep = el.dataset.countdownStep.match(
            /(?:(?<h>\d{0,2})h)?(?:(?<m>\d{0,2})m)?(?:(?<s>\d{0,2})s)?/
        );

        return (
            (countdownStep.groups.h
                ? parseInt(countdownStep.groups.h) * 3600
                : 0) +
            (countdownStep.groups.m
                ? parseInt(countdownStep.groups.m) * 60
                : 0) +
            (countdownStep.groups.s ? parseInt(countdownStep.groups.s) : 0)
        );
    })();

    // init
    el.innerHTML = moment.utc(remainingTime * 1000).format(timerFormat);

    setInterval(() => {
        remainingTime -= countdownStep;

        if (remainingTime <= 0) {
            location.reload();
            return;
        }

        remainingTime = remainingTime < 0 ? 0 : remainingTime;

        el.innerHTML = moment("1970-01-01")
            .startOf("day")
            .seconds(remainingTime)
            .format(timerFormat);
        // el.innerHTML = moment.utc(remainingTime * 1000).format(timerFormat);
    }, countdownStep * 1000);
});
