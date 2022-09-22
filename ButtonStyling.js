const styleStopButton = ($buttonRight) => {
    $buttonRight.innerText = "Stop";
    $buttonRight.classList.remove("start-button");
    $buttonRight.classList.add("stop-button");
}
const styleStartButton = ($buttonRight) => {
    $buttonRight.innerText = "Start";
    $buttonRight.classList.remove("stop-button");
    $buttonRight.classList.add("start-button");
}
const styleDisabledLeftButton = ($buttonLeft) => {
    $buttonLeft.disabled = true;
    $buttonLeft.innerText = "Lap";
    $buttonLeft.classList.remove("enabled-left-button");
    $buttonLeft.classList.add("disabled-left-button");
}
const styleEnabledLeftButton = ($buttonLeft) => {
    $buttonLeft.disabled = false;
    $buttonLeft.innerText = "Lap";
    $buttonLeft.classList.remove("disabled-left-button");
    $buttonLeft.classList.add("enabled-left-button");
}

export {styleDisabledLeftButton, styleEnabledLeftButton, styleStartButton, styleStopButton};