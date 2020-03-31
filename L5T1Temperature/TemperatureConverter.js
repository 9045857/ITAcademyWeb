document.addEventListener("DOMContentLoaded", function () {
    function convertToKelvin(celsiusDegrees) {
        return celsiusDegrees + 273.15;
    }

    function convertToFahrenheit(celsiusDegrees) {
        return (celsiusDegrees * 9 / 5) + 32;
    }

    function addWarningClass(warningText, inputTemperature, warningClass) {
        warningText.classList.add(warningClass);
        inputTemperature.classList.add(warningClass);
    }

    function removeWarningClass(warningText, inputTemperature, warningClass) {
        warningText.classList.remove(warningClass);
        inputTemperature.classList.remove(warningClass);
    }

    function isNumeric(num) {
        num = "" + num;
        return !isNaN(num) && !isNaN(parseFloat(num));
    }

    function convertTemperature(kelvinSpanText, fahrenheitSpanText, inputCelsiusTemperature, warning, warningClass) {
        if (inputCelsiusTemperature.value === "") {
            kelvinSpanText.textContent = "";
            fahrenheitSpanText.textContent = "";

            var emptyInputWarning = "Введите значение температуры!";
            warning.textContent = emptyInputWarning;

            addWarningClass(warning, inputCelsiusTemperature, warningClass);

            return;
        }

        removeWarningClass(warning, inputCelsiusTemperature, warningClass);

        if (isNumeric(inputCelsiusTemperature.value)) {
            var celsiusDegree = parseFloat(inputCelsiusTemperature.value);

            kelvinSpanText.textContent = convertToKelvin(celsiusDegree);
            fahrenheitSpanText.textContent = convertToFahrenheit(celsiusDegree);
        } else {
            var notCorrectInputWarning = "Используйте только цифры! (точка - разделитель)";
            warning.textContent = notCorrectInputWarning;

            addWarningClass(warning, inputCelsiusTemperature, warningClass);

            kelvinSpanText.textContent = "¯\\_(ツ)_/¯";
            fahrenheitSpanText.textContent = "¯\\_(ツ)_/¯";
        }
    }

    var kelvinSpan = document.querySelector("#kelvin");
    var fahrenheitSpan = document.querySelector("#fahrenheit");
    var inputCelsius = document.querySelector("#input-celsius");
    var warningP = document.querySelector("#warning-message");
    var notCorrectInputWarningClass = "try-not-correct-input";

    var button = document.querySelector("#convert-button");
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

