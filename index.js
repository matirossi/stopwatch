let tens = 0;
let seconds = 0;
let minutes = 0;
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
const appendMinutes = document.getElementById("minutes");
const buttonRight = document.getElementById("button-right");
const buttonLeft = document.getElementById("button-left");
let interval = null;
const lapsList = document.getElementById("laps-list");
let isTimerRunning = false;

const runTimer = () => {
    tens++;
    if (tens > 9){
        appendTens.innerHTML = tens;
    } else {
        appendTens.innerHTML = "0" + tens
    }
    if (tens === 99) {
        tens = 0;
        seconds++;
        if (seconds < 10) {
            appendSeconds.innerHTML = "0" + seconds;
        } else if (seconds === 60) {
            appendSeconds.innerHTML = "00";
        } else {
            appendSeconds.innerHTML = seconds;
        }
    }
    if (seconds === 60)
    { 
        seconds = 0;
        minutes++;
        if (minutes < 10) {
            appendMinutes.innerHTML = "0" + minutes;
        } else {
            appendMinutes.innerHTML = minutes;
        } 
    }
}

buttonRight.onclick = () => {
    if (!isTimerRunning){
        interval = setInterval(runTimer,10);
        buttonLeft.innerHTML = "Lap";
        buttonRight.innerHTML = "stop";
        isTimerRunning = true;
        console.log("button clicked")
    } else {
        clearInterval(interval);
        buttonLeft.innerHTML = "Reset"; 
        buttonRight.innerHTML = "Start";
        isTimerRunning = false;
        console.log("time is running now")
    }
};

const createNewLap = () => {
    let lapTimer = "00:00.00";
    const newLap = document.createElement("li");
    newLap.classList.add("lap")
    newLap.innerHTML = `<span>Lap</span><span>${lapTimer}</span>`;
    lapsList.insertBefore(newLap, lapsList.firstChild);
    if (lapsList.lastElementChild.innerHTML.trim() === ""){
        lapsList.lastElementChild.remove();
    }
}

buttonLeft.addEventListener("click", () => {
    if (buttonLeft.innerHTML === "Reset") {
        minutes = 0;
        seconds = 0;
        tens = 0;
        appendMinutes.innerHTML = "00";
        appendSeconds.innerHTML = "00";
        appendTens.innerHTML = "00";
    }
    if (buttonLeft.innerHTML === "Lap") {
        createNewLap();
    }
});
