let [tensCounter,secondsCounter, minutesCounter] = [0, 0, 0];
const lapCounters = {tensCounter: 0, secondsCounter: 0, minutesCounter: 0};
let lapStartDate;
let elapsedTime = 0;
let interval, lapInterval;
let isTimerRunning = false;
const $tens = document.getElementById("tens");
const $seconds = document.getElementById("seconds");
const $minutes = document.getElementById("minutes");
const $buttonRight = document.getElementById("button-right");
const $buttonLeft = document.getElementById("button-left");
const $lapsList = document.getElementById("laps-list");
const sixEmptyLaps = $lapsList.innerHTML;

const runTimer = () => {
    tensCounter++;
    if (tensCounter > 9){
        $tens.innerHTML = tensCounter;
    } else {
        $tens.innerHTML = "0" + tensCounter;
    }
    if (tensCounter === 99) {
        tensCounter = 0;
        secondsCounter++;
        if (secondsCounter < 10) {
            $seconds.innerHTML = "0" + secondsCounter;
        } else if (secondsCounter === 60) {
            $seconds.innerHTML = "00";
        } else {
            $seconds.innerHTML = secondsCounter;
        }
    }
    if (secondsCounter === 60)
    { 
        secondsCounter = 0;
        minutesCounter++;
        if (minutesCounter < 10) {
            $minutes.innerHTML = `0${minutesCounter}`;
        } else {
            $minutes.innerHTML = minutesCounter;
        } 
    }
}

const createNewLap = () => {
    const newLap = document.createElement("li");
    newLap.classList.add("lap")
    $lapsList.insertBefore(newLap, $lapsList.firstChild);
    ($lapsList.lastElementChild.innerHTML.trim() === "") && $lapsList.lastElementChild.remove();
}
const updateLapNode = (lapObj) => {
    const tens = lapObj.tensCounter > 9 ? lapObj.tensCounter :  `0${lapObj.tensCounter}`;
    const seconds = lapObj.secondsCounter > 9 ? lapObj.secondsCounter :  `0${lapObj.secondsCounter}`;
    const minutes = lapObj.minutesCounter < 9 ? `0${lapObj.minutesCounter}` : lapObj.minutesCounter ;
    $lapsList.firstElementChild.innerHTML = `<span>Lap</span><span>${minutes}:${seconds}.${tens}</span>`;
}

const updateLapTimer = (lapObj) => {
    const temporalElapsedTime = Date.now() - lapStartDate + elapsedTime;
    lapObj.tensCounter = temporalElapsedTime % 100;
    lapObj.secondsCounter = Math.floor(temporalElapsedTime / 1000) % 60;
    lapObj.minutesCounter = Math.floor((temporalElapsedTime / 1000) / 60) % 60;
    updateLapNode(lapObj);
}

$buttonRight.onclick = () => {   
    if (!isTimerRunning){
        $lapsList.firstElementChild.innerHTML.trim() === "" && createNewLap();
        lapStartDate = Date.now();
        $buttonLeft.innerHTML = "Lap";
        $buttonRight.innerHTML = "stop";
        isTimerRunning = true;
        $buttonLeft.disabled = false;
        interval = setInterval(runTimer,10);
        lapInterval = setInterval(updateLapTimer, 1, lapCounters);
    } else {
        clearInterval(interval);
        clearInterval(lapInterval);
        elapsedTime += Date.now() - lapStartDate;
        $buttonLeft.innerHTML = "Reset"; 
        $buttonRight.innerHTML = "Start";
        isTimerRunning = false;
    }
};

$buttonLeft.addEventListener("click", () => {
    if ($buttonLeft.innerHTML === "Reset") {
        $buttonLeft.disabled = true;
        $buttonLeft.innerHTML = "Lap";
        [tensCounter,secondsCounter, minutesCounter] = [0, 0, 0]; 
        [$minutes.innerHTML, $seconds.innerHTML, $tens.innerHTML] = ["00", "00", "00"];
        elapsedTime = 0;
        $lapsList.innerHTML = sixEmptyLaps;
    } else if($buttonLeft.innerHTML === "Lap"){
        elapsedTime = 0;
        lapStartDate = Date.now();
        createNewLap();
    }
});


const increment = (num) => {
    num++
}