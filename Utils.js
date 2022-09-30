const formatNumber = (number) => {
    return number.toString().padStart(2, "0");
};

const updateTimerNode = ($timer, counters) => {
    const centisecondsCounter = formatNumber(counters.centisecondsCounter);
    const seconds = formatNumber(counters.secondsCounter);
    const minutes = formatNumber(counters.minutesCounter);
    $timer.innerText = `${minutes}:${seconds}.${centisecondsCounter}`;
};

const updateCounters = (temporalElapsedTime, countersObject) => {
    countersObject.centisecondsCounter = Math.floor(temporalElapsedTime / 10) % 100;
    countersObject.secondsCounter = Math.floor(temporalElapsedTime / 1000) % 60;
    countersObject.minutesCounter = Math.floor(temporalElapsedTime / 1000 / 60) % 60;
};

export {updateCounters, updateTimerNode}