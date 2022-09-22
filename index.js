import * as LapStyling from './LapStyling.js';
import * as ButtonStyling from './ButtonStyling.js';
const counters = {hundredsCounter: 0,secondsCounter: 0, minutesCounter: 0}
const lapCounters = {hundredsCounter: 0, secondsCounter: 0, minutesCounter: 0};
let lapStartingDate, startingDate;
let currentLapNumber = 0
let [elapsedTime, elapsedLapTime] = [0, 0];
let interval;
const recordsList = [];
let isTimerRunning = false;
const $timer = document.getElementById("timer");
const $buttonRight = document.getElementById("right-button");
const $buttonLeft = document.getElementById("left-button");
const $lapsList = document.getElementById("laps-list");
let $currentFirstLap;
const sixEmptyLaps = $lapsList.innerHTML;

const createNewLap = () => {
    currentLapNumber++;
    const newLap = document.createElement("li");
    const lapNumberSpan = document.createElement("span");
    const timerSpan = document.createElement("span");
    newLap.classList.add("lap");
    $lapsList.insertBefore(newLap, $lapsList.firstChild);
    $currentFirstLap = newLap;
    newLap.appendChild(lapNumberSpan);
    newLap.appendChild(timerSpan);
    lapNumberSpan.innerText = `Lap ${currentLapNumber}`
    console.log($currentFirstLap.lastElementChild);
    ($lapsList.lastElementChild.innerHTML.trim() === "") && $lapsList.lastElementChild.remove();
}
const formatNumber = (number) => {
    return (number).toString().padStart(2, "0");
}
const updateTimerNode = ($timer) => {
    const hundreds = formatNumber(counters.hundredsCounter);
    const seconds = formatNumber(counters.secondsCounter);
    const minutes = formatNumber(counters.minutesCounter);
    $timer.innerText = `${minutes}:${seconds}.${hundreds}`;
}

const updateCounters = (temporalElapsedTime, countersObject) => {
    countersObject.hundredsCounter = Math.floor(temporalElapsedTime / 10) % 100;
    countersObject.secondsCounter = Math.floor(temporalElapsedTime / 1000) % 60;
    countersObject.minutesCounter = Math.floor((temporalElapsedTime / 1000) / 60) % 60;
}

const updateTimer = () => {
    const currentDate = Date.now();
    const temporalElapsedTime = currentDate - startingDate + elapsedTime;
    const lapTemporalElapsedTime = currentDate - lapStartingDate + elapsedLapTime;
    updateCounters(temporalElapsedTime, counters);
    updateCounters(lapTemporalElapsedTime, lapCounters);
    updateTimerNode($timer);
    updateTimerNode($currentFirstLap.lastElementChild);
}
 
const addNewRecord = () => {
    recordsList.unshift(elapsedLapTime);
}

const resetRecordList = () => {
    recordsList.length = 0;
}


$buttonRight.onclick = () => {   
    if (!isTimerRunning){
        $lapsList.firstElementChild.innerHTML.trim() === "" && createNewLap();
        startingDate = Date.now();
        lapStartingDate = Date.now();
        ButtonStyling.styleStopButton($buttonRight);
        ButtonStyling.styleEnabledLeftButton($buttonLeft);
        interval = setInterval(updateTimer,10);
        isTimerRunning = true;
    } else {
        clearInterval(interval);
        elapsedTime += Date.now() - startingDate;
        elapsedLapTime +=Date.now() - lapStartingDate;
        ButtonStyling.styleStartButton($buttonRight);
        $buttonLeft.innerHTML = "Reset"; 
        isTimerRunning = false;
    }
};


$buttonLeft.addEventListener("click", () => {
    if($buttonLeft.innerText === "Reset") {
        currentLapNumber = 0;
        $timer.innerText = "00:00.00";
        [elapsedTime, elapsedLapTime] = [0, 0];
        $lapsList.innerHTML = sixEmptyLaps;
        ButtonStyling.styleDisabledLeftButton($buttonLeft);
        resetRecordList();
    } else if($buttonLeft.innerText === "Lap"){
        elapsedLapTime +=Date.now() - lapStartingDate;
        addNewRecord()
        elapsedLapTime = 0;
        lapStartingDate = Date.now();
        createNewLap()
        if(recordsList.length > 1){
            LapStyling.uncolorLaps();
            LapStyling.colorMaxValue(recordsList);
            LapStyling.colorMinValue(recordsList);
        }
    }
});