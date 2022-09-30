import {updateCounters, updateTimerNode} from "./Utils.js"
import * as LapStyling from "./LapStyling.js";
import * as ButtonStyling from "./ButtonStyling.js";

let lapStartingTimestamp, startingTimestamp;
let isTimerRunning = false;
let animationFrameId;

//counters
let currentLapNumber = 0;
let [timeAtPause, lapTimeAtPause] = [0, 0];
let [elapsedTime, lapElapsedTime] = [0, 0];
const counters = { centisecondsCounter: 0, secondsCounter: 0, minutesCounter: 0 };

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
  $lapsList.lastElementChild.innerHTML.trim() === "" && $lapsList.lastElementChild.remove();
};

const updateTimerAnimation = (timestamp) => {
  if (!startingTimestamp) startingTimestamp = timestamp;
  if (!lapStartingTimestamp) lapStartingTimestamp = timestamp;
  elapsedTime = timestamp - startingTimestamp + timeAtPause;
  lapElapsedTime = timestamp - lapStartingTimestamp + lapTimeAtPause;
  updateCounters(elapsedTime, counters);
  updateTimerNode($timer, counters);
  updateCounters(lapElapsedTime, counters);
  updateTimerNode($currentFirstLap.lastElementChild, counters);
  animationFrameId = window.requestAnimationFrame(updateTimerAnimation);
};

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
    ButtonStyling.styleStopButton($buttonRight);
    ButtonStyling.styleEnabledLeftButton($buttonLeft);
    animationFrameId = window.requestAnimationFrame(updateTimerAnimation);
  } else {
    cancelAnimationFrame(animationFrameId);
    timeAtPause = elapsedTime;
    lapTimeAtPause = lapElapsedTime;
    resetStartingPoints();
    isTimerRunning = false;
    ButtonStyling.styleStartButton($buttonRight);
    $buttonLeft.innerHTML = "Reset";
  }
};

$buttonLeft.onclick = () => {
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
};