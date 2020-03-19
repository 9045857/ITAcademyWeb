function sortFromBigToSmall(a, b) {
    return b - a;
}

function getArrayFirstFiveElements(array) {
    var fromIndex = 0;
    var beforeIndex = 5;

    return array.slice(fromIndex, beforeIndex);
}

function getArrayLastFiveElements(array) {
    var printElementsCount = 5;
    var fromIndex = array.length - printElementsCount;

    if (fromIndex <= 0) {
        return [];
    } 

    return array.slice(fromIndex);
}

function getArrayEvenNumbersSum(array) {
    return array.filter(function (item) {
        return item % 2 === 0;
    }).reduce(function (sum, current) {
        return sum + current;
    }, 0);
}

function isEven(value) {
    return value % 2 === 0;
}

function squaring(value) {
    var exponent = 2;
    return Math.pow(value, exponent);
}

function getEvenNumbersSquareArray(array) {
    return array.filter(isEven).map(squaring);
}

function getFrom1To100Array() {
    var elementsCount = 100;
    var array = [];

    for (var i = 1; i <= elementsCount; i++) {
        array.push(i);
    }
    return array;
}

(function () {
    var numbersArray = [2, 4, 6, 5, 1, 3, 7, 0, 8, 10];
    console.log("Массив: " + numbersArray);

    numbersArray.sort(sortFromBigToSmall);
    console.log("Отсортированный массив: " + numbersArray);

    console.log("Первые пять элементов массива: " + getArrayFirstFiveElements(numbersArray));
    console.log("Последние пять элементов массива: " + getArrayLastFiveElements(numbersArray));
    console.log("Сумма четных чисел массива: " + getArrayEvenNumbersSum(numbersArray));

    console.log("Сумма квадратов четных чисел от 1 до 100: " + getEvenNumbersSquareArray(getFrom1To100Array()));
}());