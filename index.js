import * as LapStyling from "./LapStyling.js";
import * as ButtonStyling from "./ButtonStyling.js";

let lapStartingTimestamp, startingTimestamp;
let isTimerRunning = false;
let interval;

//counters
let currentLapNumber = 0;
let [timeAtPause, lapTimeAtPause] = [0, 0];
let [elapsedTime, lapElapsedTime] = [0, 0];
const counters = { hundredsCounter: 0, secondsCounter: 0, minutesCounter: 0 };
const lapCounters = {hundredsCounter: 0, secondsCounter: 0, minutesCounter: 0};

//DOM elements
const $timer = document.getElementById("timer");
const $buttonRight = document.getElementById("right-button");
const $buttonLeft = document.getElementById("left-button");
const $lapsList = document.getElementById("laps-list");
const $sixEmptyLaps = $lapsList.innerHTML;
let $currentFirstLap;

const createNewLap = () => {
  currentLapNumber++;
  const newLap = document.createElement("li");
  newLap.classList.add("lap");
  $lapsList.insertBefore(newLap, $lapsList.firstChild);
  newLap.innerHTML = `<span>lap ${currentLapNumber}</span><span>00:00.00</span>`;
  $currentFirstLap = newLap;
  $lapsList.lastElementChild.innerHTML.trim() === "" &&
  $lapsList.lastElementChild.remove();
};

const formatNumber = (number) => {
  return number.toString().padStart(2, "0");
};

const updateTimerNode = ($timer, counters) => {
  const hundreds = formatNumber(counters.hundredsCounter);
  const seconds = formatNumber(counters.secondsCounter);
  const minutes = formatNumber(counters.minutesCounter);
  $timer.innerText = `${minutes}:${seconds}.${hundreds}`;
};

const updateCounters = (temporalElapsedTime, countersObject) => {
  countersObject.hundredsCounter = Math.floor(temporalElapsedTime / 10) % 100;
  countersObject.secondsCounter = Math.floor(temporalElapsedTime / 1000) % 60;
  countersObject.minutesCounter = Math.floor(temporalElapsedTime / 1000 / 60) % 60;
};

const updateTimer = () => {
  if (!startingTimestamp) startingTimestamp = Date.now();
  if (!lapStartingTimestamp) lapStartingTimestamp = Date.now();
  elapsedTime = Date.now() - startingTimestamp + timeAtPause;
  lapElapsedTime = Date.now() - lapStartingTimestamp + lapTimeAtPause;
  updateCounters(elapsedTime, counters);
  updateCounters(lapElapsedTime, lapCounters);
  updateTimerNode($timer, counters);
  updateTimerNode($currentFirstLap.lastElementChild, lapCounters);
}

/* const updateTimerAnimation = (timestamp) => {
  if (!startingDate) startingDate = timestamp;
  if (!lapStartingDate) lapStartingDate = timestamp;
  const currentDate = timestamp;
  const temporalElapsedTime = currentDate - startingDate + elapsedTime;
  const lapTemporalElapsedTime = currentDate - lapStartingDate + lapElapsedTime;
  updateCounters(temporalElapsedTime, counters);
  updateCounters(lapTemporalElapsedTime, lapCounters);
  updateTimerNode($timer, counters);
  updateTimerNode($currentFirstLap.lastElementChild, lapCounters);

  if (isTimerRunning) {
    window.requestAnimationFrame(updateTimerAnimation);
  } else {
    elapsedTime = temporalElapsedTime;
    lapElapsedTime = lapTemporalElapsedTime;
    [startingDate, lapStartingDate] = [0, 0];
  }
  if (recordCurrentLapElapsedTime) {
    lapElapsedTime = lapTemporalElapsedTime;
    recordCurrentLapElapsedTime = !recordCurrentLapElapsedTime;
    resetVariables = true
  }
}; */

const resetTimersNodes = () => {
  $timer.innerText = "00:00.00";
  $lapsList.innerHTML = $sixEmptyLaps;
};

const resetCounters =  () => {
  [timeAtPause, lapTimeAtPause, currentLapNumber, elapsedTime, lapElapsedTime] = [0, 0, 0, 0, 0];
}

const resetStartingPoints = () => {
  lapStartingTimestamp = 0;
  startingTimestamp = 0;
}

$buttonRight.onclick = () => {
  if (!isTimerRunning) {
    isTimerRunning = true;
    $lapsList.firstElementChild.innerHTML.trim() === "" && createNewLap();
    interval = setInterval(updateTimer, 50);
    ButtonStyling.styleStopButton($buttonRight);
    ButtonStyling.styleEnabledLeftButton($buttonLeft);
    //window.requestAnimationFrame(updateTimerAnimation);
  } else {
    clearInterval(interval);
    timeAtPause = elapsedTime;
    lapTimeAtPause = lapElapsedTime;
    isTimerRunning = false;
    ButtonStyling.styleStartButton($buttonRight);
    $buttonLeft.innerHTML = "Reset";
  }
};

$buttonLeft.addEventListener("click", () => {
  if ($buttonLeft.innerText === "Reset") {
    resetTimersNodes();
    resetCounters();
    resetStartingPoints();
    ButtonStyling.styleDisabledLeftButton($buttonLeft);
  } else if ($buttonLeft.innerText === "Lap") {
    LapStyling.updateMinMaxRecords(lapElapsedTime, $lapsList, currentLapNumber);
    lapTimeAtPause = 0;
    lapStartingTimestamp = 0;
    createNewLap();
  }
});