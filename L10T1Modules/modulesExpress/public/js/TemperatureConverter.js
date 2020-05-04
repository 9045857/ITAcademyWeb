import { convertTemperature, removeWarningClass } from "./Methods.js";

document.addEventListener("DOMContentLoaded", function () {
    const kelvinSpan = document.querySelector("#kelvin");
    const fahrenheitSpan = document.querySelector("#fahrenheit");
    const inputCelsius = document.querySelector("#input-celsius");
    const warningP = document.querySelector("#warning-message");
    const notCorrectInputWarningClass = "try-not-correct-input";

    const button = document.querySelector("#convert-button");
    button.addEventListener("click", function () {
        convertTemperature(kelvinSpan, fahrenheitSpan, inputCelsius, warningP, notCorrectInputWarningClass);
    });

    inputCelsius.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            convertTemperature(kelvinSpan, fahrenheitSpan, inputCelsius, warningP, notCorrectInputWarningClass);
        }
    });

    inputCelsius.addEventListener("focus", function () {
        removeWarningClass(warningP, inputCelsius, notCorrectInputWarningClass);
    });
});