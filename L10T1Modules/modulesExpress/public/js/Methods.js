import * as converter from "./Converters.js";
import isNumeric from "./Parse.js";
import { emptyEnter as emptyWarning, forbiddenSymbols as badSymbolsWarning, notUnderstoodMeaning as errorMessage } from "./Warnings.js";

export function addWarningClass(warningText, inputTemperature, warningClass) {
    warningText.classList.add(warningClass);
    inputTemperature.classList.add(warningClass);
}

export function removeWarningClass(warningText, inputTemperature, warningClass) {
    warningText.classList.remove(warningClass);
    inputTemperature.classList.remove(warningClass);
}

export function convertTemperature(kelvinSpanText, fahrenheitSpanText, inputCelsiusTemperature, warning, warningClass) {
    if (inputCelsiusTemperature.value === "") {
        kelvinSpanText.textContent = "";
        fahrenheitSpanText.textContent = "";

        warning.textContent = emptyWarning;

        addWarningClass(warning, inputCelsiusTemperature, warningClass);

        return;
    }

    removeWarningClass(warning, inputCelsiusTemperature, warningClass);

    if (isNumeric(inputCelsiusTemperature.value)) {
        let celsiusDegree = parseFloat(inputCelsiusTemperature.value);

        kelvinSpanText.textContent = converter.toKelvin(celsiusDegree);
        fahrenheitSpanText.textContent = converter.toFahrenheit(celsiusDegree);
    } else {
        warning.textContent = badSymbolsWarning;

        addWarningClass(warning, inputCelsiusTemperature, warningClass);

        kelvinSpanText.textContent = errorMessage;
        fahrenheitSpanText.textContent = errorMessage;
    }
}