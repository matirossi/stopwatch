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
const sixEmptyLaps = $lapsList.innerHTML;

const createNewLap = () => {
    currentLapNumber++;
    const newLap = document.createElement("li");
    newLap.classList.add("lap");
    $lapsList.insertBefore(newLap, $lapsList.firstChild);
    ($lapsList.lastElementChild.innerHTML.trim() === "") && $lapsList.lastElementChild.remove();
}

const updateTimerNode = () => {
    const hundreds = counters.hundredsCounter > 9 ? counters.hundredsCounter :  `0${counters.hundredsCounter}`;
    const seconds = counters.secondsCounter > 9 ? counters.secondsCounter :  `0${counters.secondsCounter}`;
    const minutes = counters.minutesCounter < 9 ? `0${counters.minutesCounter}` : counters.minutesCounter ;
    $timer.innerText = `${minutes}:${seconds}.${hundreds}`;
}

const updateLapNode = () => {
    const hundreds = lapCounters.hundredsCounter > 9 ? lapCounters.hundredsCounter :  `0${lapCounters.hundredsCounter}`;
    const seconds = lapCounters.secondsCounter > 9 ? lapCounters.secondsCounter :  `0${lapCounters.secondsCounter}`;
    const minutes = lapCounters.minutesCounter < 9 ? `0${lapCounters.minutesCounter}` : lapCounters.minutesCounter ;
    $lapsList.firstElementChild.innerHTML = `<span>Lap ${currentLapNumber}</span><span>${minutes}:${seconds}.${hundreds}</span>`;
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
    updateTimerNode();
    updateLapNode(); 
}
 
const addNewRecord = () => {
    recordsList.unshift(elapsedLapTime);
}

const resetRecordList = () => {
    recordsList.length = 0;
}
const uncolorLaps = () => {
    const previousMaxTimeNode = document.querySelector(".max-value-lap");
    previousMaxTimeNode && previousMaxTimeNode.classList.remove("max-value-lap");
    const previousMinTimeNode = document.querySelector(".min-value-lap");
    previousMinTimeNode && previousMinTimeNode.classList.remove("min-value-lap");
}

const colorMaxValue = () => {
    const maxValue = Math.max(...recordsList);
    const maxValuePosition = recordsList.indexOf(maxValue);
    const currentMaxValueNode = document.querySelector(`#laps-list :nth-child(${maxValuePosition + 2})`);
    currentMaxValueNode.classList.add("max-value-lap");
}
const colorMinValue = () => {
    const minValue = Math.min(...recordsList);
    const minValuePosition = recordsList.indexOf(minValue);
    const currentMinValueNode = document.querySelector(`#laps-list :nth-child(${minValuePosition + 2})`);
    currentMinValueNode.classList.add("min-value-lap");
}
const styleStopButton = () => {
    $buttonRight.innerText = "Stop";
    $buttonRight.classList.remove("start-button");
    $buttonRight.classList.add("stop-button");
}
const styleStartButton = () => {
    $buttonRight.innerText = "Start";
    $buttonRight.classList.remove("stop-button");
    $buttonRight.classList.add("start-button");
}
const styleDisabledLeftButton = () => {
    $buttonLeft.disabled = true;
    $buttonLeft.innerText = "Lap";
    $buttonLeft.classList.remove("enabled-left-button");
    $buttonLeft.classList.add("disabled-left-button");
}
const styleEnabledLeftButton = () => {
    $buttonLeft.disabled = false;
    $buttonLeft.innerText = "Lap";
    $buttonLeft.classList.remove("disabled-left-button");
    $buttonLeft.classList.add("enabled-left-button");
}
$buttonRight.onclick = () => {   
    if (!isTimerRunning){
        $lapsList.firstElementChild.innerHTML.trim() === "" && createNewLap();
        startingDate = Date.now();
        lapStartingDate = Date.now();
        styleStopButton();
        styleEnabledLeftButton();
        interval = setInterval(updateTimer,10);
        isTimerRunning = true;
    } else {
        clearInterval(interval);
        elapsedTime += Date.now() - startingDate;
        elapsedLapTime +=Date.now() - lapStartingDate;
        styleStartButton();
        $buttonLeft.innerHTML = "Reset"; 
        isTimerRunning = false;
    }
};

$buttonLeft.addEventListener("click", () => {
    if($buttonLeft.innerText === "Reset") {
        $timer.innerText = "00:00.00";
        [elapsedTime, elapsedLapTime] = [0, 0];
        $lapsList.innerHTML = sixEmptyLaps;
        styleDisabledLeftButton();
        resetRecordList();
    } else if($buttonLeft.innerText === "Lap"){
        elapsedLapTime +=Date.now() - lapStartingDate;
        addNewRecord()
        elapsedLapTime = 0;
        lapStartingDate = Date.now();
        createNewLap()
        if(recordsList.length > 1){
            uncolorLaps();
            colorMaxValue();
            colorMinValue();
        }
    }
});