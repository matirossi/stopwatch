import {updateCounters, updateTimerNode} from "./Utils.js"
import * as LapStyling from "./LapStyling.js";
import * as ButtonStyling from "./ButtonStyling.js";

let isTimerRunning = false;
let animationFrameId;
let lapStartingTimestamp, startingTimestamp;

//counters
let [timeAtPause, lapTimeAtPause] = [0, 0];
let [elapsedTime, lapElapsedTime] = [0, 0];
let currentLapNumber = 0;

//DOM elements
const $timer = document.getElementById("timer");
const $startStopButton = document.getElementById("start-stop-button");
const $lapResetButton = document.getElementById("lap-reset-button");
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
  updateTimerNode($timer, updateCounters(elapsedTime));
  updateTimerNode($currentFirstLap.lastElementChild, updateCounters(lapElapsedTime));
  animationFrameId = window.requestAnimationFrame(updateTimerAnimation);
};

const resetTimersNodes = () => {
  $timer.innerText = "00:00.00";
  $lapsList.innerHTML = $sixEmptyLaps;
};

const resetCounters =  () => {
  [timeAtPause, lapTimeAtPause, elapsedTime, lapElapsedTime, currentLapNumber] = [0, 0, 0, 0, 0];
}

const resetStartingPoints = () => {
  lapStartingTimestamp = 0;
  startingTimestamp = 0;
}

$startStopButton.onclick = () => {
  if (!isTimerRunning) {
    isTimerRunning = true;
    $lapsList.firstElementChild.innerHTML.trim() === "" && createNewLap();
    ButtonStyling.styleStopButton($startStopButton);
    ButtonStyling.styleEnabledButton($lapResetButton);
    animationFrameId = window.requestAnimationFrame(updateTimerAnimation);
  } else {
    cancelAnimationFrame(animationFrameId);
    timeAtPause = elapsedTime;
    lapTimeAtPause = lapElapsedTime;
    resetStartingPoints();
    isTimerRunning = false;
    ButtonStyling.styleStartButton($startStopButton);
    $lapResetButton.innerText = "Reset";
  }
};

$lapResetButton.onclick = () => {
  if ($lapResetButton.innerText === "Reset") {
    resetTimersNodes();
    resetCounters();
    resetStartingPoints();
    ButtonStyling.styleDisabledButton($lapResetButton);
  } else if ($lapResetButton.innerText === "Lap") {
    LapStyling.updateMinMaxRecords(lapElapsedTime, $lapsList, currentLapNumber);
    lapTimeAtPause = 0;
    lapStartingTimestamp = 0;
    createNewLap();
  }
};