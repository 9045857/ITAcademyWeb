//4. (?) В функции printArrayLastFiveElements есть обращение к переменной numberArray, которой может не существовать в контексте вызова этой функции

function sortArray(array) {
    array.sort(function (a, b) {
        return a - b;
    });
}

function arrayFirstFiveElements(array) {
    var fromIndex = 0;
    var beforeIndex = 5;

    return array.slice(fromIndex, beforeIndex);
}

function arrayLastFiveElements(array) {
    var printElementsCount = 5;
    var fromIndex = array.length - printElementsCount;

    return numberArray.slice(fromIndex);
}

function arrayEvenNumbersSum(array) {
    return array.filter(function (item) {
        return item % 2 === 0;
    }).reduce(function (sum, current) { return sum + current }, 0);
}

function getEvenNumbersSquareSumArray(array) {
    var exponent = 2;

    return array.filter(function (item) {
        return item % 2 === 0;
    }).reduce(function (sum, current) { return sum + Math.pow(current, exponent) }, 0);
}

var numberArray = [2, 4, 6, 5, 1, 3, 7, 0, 8, 10];
console.log("Массив: " + numberArray);

sortArray(numberArray);
console.log("Отсортированный массив: " + numberArray);

console.log("Первые пять элементов массива: " + arrayFirstFiveElements(numberArray));
console.log("Последние пять элементов массива: " + arrayLastFiveElements(numberArray));
console.log("Сумма четных чисел массива: " + arrayEvenNumbersSum(numberArray));

var elementsCount = 100;
var array = [];

for (var i = 1; i <= elementsCount; i++) {
    array.push(i);
}

console.log("Сумма квадратов четных чисел от 1 до 100: " + getEvenNumbersSquareSumArray(array));