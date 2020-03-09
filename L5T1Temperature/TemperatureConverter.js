document.addEventListener("DOMContentLoaded", function () {
    function convertToKelvin(celsiusDegrees) {
        return celsiusDegrees + 273.15;
    }

    function convertToFahrenheit(celsiusDegrees) {
        return (celsiusDegrees * 9 / 5) + 32;
    }

    function convertTemperature(kelvinSpanText, fahrenheitSpanText, inputText) {
        if (inputText.value === "") {
            kelvinSpanText.textContent = "";
            fahrenheitSpanText.textContent = "";
            return;
        }

        var celsiusDegree = parseFloat(inputText.value);

        if (!isNaN(celsiusDegree)) {
            kelvinSpanText.textContent = convertToKelvin(celsiusDegree);
            fahrenheitSpanText.textContent = convertToFahrenheit(celsiusDegree);
        } else {
            kelvinSpanText.textContent = "¯\\_(ツ)_/¯";
            fahrenheitSpanText.textContent = "¯\\_(ツ)_/¯";
        }
    }

    (function () {
        var kelvinSpan = document.querySelector("#kelvin");
        var fahrenheitSpan = document.querySelector("#fahrenheit");
        var inputCelsius = document.querySelector(".input-area input");

        var button = document.querySelector("#convert-button");
        button.addEventListener("click", function () {
            convertTemperature(kelvinSpan, fahrenheitSpan, inputCelsius);
        });

        inputCelsius.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                convertTemperature(kelvinSpan, fahrenheitSpan, inputCelsius);
            }
        });
    }());
});

