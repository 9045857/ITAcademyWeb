
//• Сделайте страницу для перевода температур
//• Сделайте поле ввода для температуры в цельсиях
//• И по нажатию на кнопку, чтобы температура переводилась
//в шкалы кельвина и фаренгейта, и результаты выводились
//на страницу

function convertToKelvin(celsiusDegrees) {
    return celsiusDegrees + 273.15;
}

function convertToFahrenheit(celsiusDegrees) {
    return (celsiusDegrees * 9 / 5) + 32;
}

function convertTemperature() {
    var inputText = document.querySelector(".input-temperature>input").value;

    if (inputText === "") {
        document.querySelector(".kelvin").textContent = "";
        document.querySelector(".fahrenheit").textContent = "";

        return;
    }

    var celsiusDegree = parseFloat(inputText);

    if (!isNaN(celsiusDegree)) {
        document.querySelector(".kelvin").textContent = convertToKelvin(celsiusDegree);
        document.querySelector(".fahrenheit").textContent = convertToFahrenheit(celsiusDegree);
    } else {
        document.querySelector(".kelvin").textContent = "некорректное введенное значение";
        document.querySelector(".fahrenheit").textContent = "некорректное введенное значение";
    }
}

(function () {
    var button = document.querySelector(".convert-button");
    button.addEventListener("click", function() {
         convertTemperature();
    });
}());

(function () {
    document.querySelector(".input-temperature>input").addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            convertTemperature();
        }
    });
}());

