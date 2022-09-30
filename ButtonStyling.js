const styleStopButton = (button) => {
    button.innerText = "Stop";
    button.classList.remove("start-button");
    button.classList.add("stop-button");
}
const styleStartButton = (button) => {
    button.innerText = "Start";
    button.classList.remove("stop-button");
    button.classList.add("start-button");
}
const styleDisabledButton = (button) => {
    button.disabled = true;
    button.innerText = "Lap";
    button.classList.remove("enabled-button");
    button.classList.add("disabled-button");
}
const styleEnabledButton = (button) => {
    button.disabled = false;
    button.innerText = "Lap";
    button.classList.remove("disabled-button");
    button.classList.add("enabled-button");
}

export {styleDisabledButton, styleEnabledButton, styleStartButton, styleStopButton};