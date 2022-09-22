//let currentLapNumber;
let [maxRecordTime, minRecordTime] = [0, 0];

const colorMaxValue = (elapsedLapTime, $lapsList) => {
    const previousMaxTimeNode = document.querySelector(".max-value-lap");
    previousMaxTimeNode && previousMaxTimeNode.classList.remove("max-value-lap");
    $lapsList.firstElementChild.classList.add("max-value-lap");
    return elapsedLapTime;
}

const colorMinValue = (elapsedLapTime, $lapsList) => {
    const previousMinTimeNode = document.querySelector(".min-value-lap");
    previousMinTimeNode && previousMinTimeNode.classList.remove("min-value-lap");
    $lapsList.firstElementChild.classList.add("min-value-lap");
    return elapsedLapTime;

}

const updateMinMaxRecords = (elapsedLapTime, $lapsList, currentLapNumber) => {
    if (currentLapNumber === 1) {
        maxRecordTime = elapsedLapTime;
        minRecordTime = elapsedLapTime;
    }
    (currentLapNumber === 2) && $lapsList.childNodes[1].classList.add("min-value-lap", "max-value-lap")
    maxRecordTime = elapsedLapTime > maxRecordTime ? colorMaxValue(elapsedLapTime, $lapsList) : maxRecordTime;
    minRecordTime = elapsedLapTime < minRecordTime ? colorMinValue(elapsedLapTime, $lapsList) : minRecordTime;
}


export {updateMinMaxRecords, colorMinValue, colorMaxValue}