const uncolorLaps = () => {
    const previousMaxTimeNode = document.querySelector(".max-value-lap");
    previousMaxTimeNode && previousMaxTimeNode.classList.remove("max-value-lap");
    const previousMinTimeNode = document.querySelector(".min-value-lap");
    previousMinTimeNode && previousMinTimeNode.classList.remove("min-value-lap");
}
const colorMaxValue = (recordsList) => {
    const maxValue = Math.max(...recordsList);
    const maxValuePosition = recordsList.indexOf(maxValue);
    const currentMaxValueNode = document.querySelector(`#laps-list :nth-child(${maxValuePosition + 2})`);
    currentMaxValueNode.classList.add("max-value-lap");
}
const colorMinValue = (recordsList) => {
    const minValue = Math.min(...recordsList);
    const minValuePosition = recordsList.indexOf(minValue);
    const currentMinValueNode = document.querySelector(`#laps-list :nth-child(${minValuePosition + 2})`);
    currentMinValueNode.classList.add("min-value-lap");
}
export {uncolorLaps, colorMaxValue, colorMinValue};