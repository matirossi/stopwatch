const formatNumber = (number) => {
    return number.toString().padStart(2, "0");
};

const updateTimerNode = ($timer, counters) => {
    $timer.innerText = `${formatNumber(counters.minutes)}:${formatNumber(counters.seconds)}.${formatNumber(counters.centiseconds)}`;
};

const updateCounters = (temporalElapsedTime) => {
    const counters = {
        centiseconds: Math.floor(temporalElapsedTime / 10) % 100,
        seconds: Math.floor(temporalElapsedTime / 1000) % 60,
        minutes: Math.floor(temporalElapsedTime / 1000 / 60) % 60
    }
    return counters
};

export { updateCounters, updateTimerNode }