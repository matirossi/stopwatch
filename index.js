let tens = 0;
let seconds = 0;
let minutes = 0;
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
const appendMinutes = document.getElementById("minutes");
const buttonRight = document.getElementById("button-right");
const buttonLeft = document.getElementById("button-left");
let interval = null;
//const listOfLaps = document.getElementsByClassName();
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
        appendSeconds.innerHTML = seconds;
        
    }
}

buttonRight.addEventListener("click",() => {
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
});

//buttonRight.addEventListener("click",console.log("evento"));


