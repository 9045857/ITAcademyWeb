function convertToKelvin(celsiusDegrees) {
    return celsiusDegrees + 273.15;
}

function convertToFahrenheit(celsiusDegrees) {
    return (celsiusDegrees * 9 / 5) + 32;
}

export { convertToKelvin as toKelvin, convertToFahrenheit as toFahrenheit };