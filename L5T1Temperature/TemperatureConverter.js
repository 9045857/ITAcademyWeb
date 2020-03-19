document.addEventListener("DOMContentLoaded", function () {
    function convertToKelvin(celsiusDegrees) {
        return celsiusDegrees + 273.15;
    }

    function convertToFahrenheit(celsiusDegrees) {
        return (celsiusDegrees * 9 / 5) + 32;
    }

    function addWarningClass(warningText, inputTemperature, warningClass) {
        if (!warningText.classList.contains(warningClass)) {
            warningText.classList.add(warningClass);
        }

        if (!inputTemperature.classList.contains(warningClass)) {
            inputTemperature.classList.add(warningClass);
        }
    }

    function removeWarningClass(warningText, inputTemperature, warningClass) {
        if (warningText.classList.contains(warningClass)) {
            warningText.classList.remove(warningClass);
        }

        if (inputTemperature.classList.contains(warningClass)) {
            inputTemperature.classList.remove(warningClass);
        }
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

        var celsiusDegree = parseFloat(inputCelsiusTemperature.value);

        if (!isNaN(celsiusDegree)) {
            kelvinSpanText.textContent = convertToKelvin(celsiusDegree);
            fahrenheitSpanText.textContent = convertToFahrenheit(celsiusDegree);

        } else {
            var notCorrectInputWarning = "Недопустимые символы ввода!";
            warning.textContent = notCorrectInputWarning;

            addWarningClass(warning, inputCelsiusTemperature, warningClass);

            kelvinSpanText.textContent = "¯\\_(ツ)_/¯";
            fahrenheitSpanText.textContent = "¯\\_(ツ)_/¯";
        }
    }

    var kelvinSpan = document.querySelector("#kelvin");
    var fahrenheitSpan = document.querySelector("#fahrenheit");
    var inputCelsius = document.querySelector("#input-celsius");
    var warningP = document.querySelector("#warning-massage");
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

