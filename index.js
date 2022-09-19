let [tensCounter,secondsCounter, minutesCounter] = [0, 0, 0];
let [lapTensCounter,lapSecondsCounter, lapMinutesCounter] = [0, 0, 0];
let interval, lapInterval;
let isTimerRunning = false;
const $tens = document.getElementById("tens");
const $seconds = document.getElementById("seconds");
const $minutes = document.getElementById("minutes");
const $buttonRight = document.getElementById("button-right");
const $buttonLeft = document.getElementById("button-left");
const $lapsList = document.getElementById("laps-list");
const sixEmptyLaps = $lapsList.innerHTML;
let num = 2
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
    let lapTimer = "00:00.00";
    const newLap = document.createElement("li");
    newLap.classList.add("lap")
    newLap.innerHTML = `<span>Lap</span><span>${lapTimer}</span>`;
    $lapsList.insertBefore(newLap, $lapsList.firstChild);
    ($lapsList.lastElementChild.innerHTML.trim() === "") && $lapsList.lastElementChild.remove();
}

$buttonRight.onclick = () => {   
    if (!isTimerRunning){
        interval = setInterval(runTimer,10);
        $buttonLeft.innerHTML = "Lap";
        $buttonRight.innerHTML = "stop";
        isTimerRunning = true;
        $buttonLeft.disabled = false;
        $lapsList.firstElementChild.innerHTML.trim() === "" && createNewLap();
    } else {
        clearInterval(interval);
        $buttonLeft.innerHTML = "Reset"; 
        $buttonRight.innerHTML = "Start";
        isTimerRunning = false;
    }
};


$buttonLeft.addEventListener("click", () => {
    if ($buttonLeft.innerHTML === "Reset") {
        $buttonLeft.disabled = true;
        $buttonLeft.innerHTML = "Lap";
        minutesCounter = 0;
        secondsCounter = 0;
        tensCounter = 0; 
        $minutes.innerHTML = "00";
        $seconds.innerHTML = "00";
        $tens.innerHTML = "00";
        $lapsList.innerHTML = sixEmptyLaps;
    } else if($buttonLeft.innerHTML === "Lap"){
        createNewLap();
    }
});


const increment = (num) => {
    num++
}