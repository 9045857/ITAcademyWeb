//Создайте массив объектов стран(пусть будет несколько
//стран)
//•
//У страны есть название и список городов(пусть будет по
//несколько городов)
//•
//У города есть название и численность населения
//•
//Найдите страну страны с максимальным количеством
//городов
//•
//Получите объект с информацией по всем странам такого
//вида: ключ название страны, значение суммарная
//численность по стране
//•
//Оформите код в виде функций

var portugal = {
    name: "Португалия",
    cities: [
        { name: "Лиссабон", population: 504718 },
        { name: "Порту", population: 214349 },
        { name: "Коимбра", population: 105842 }
    ]
};

var peru = {
    name: "Перу",
    cities: [
        { name: "Лима", population: 9562280 },
        { name: "Куско", population: 428450 },
        { name: "Арекипа", population: 978009 },
        { name: "Трухильо", population: 645000 }
    ]
};

var argentina = {
    name: "Аргентина",
    cities: [
        { name: "Буэнос-Айрес", population: 2890000 },
        { name: "Сальта", population: 535050 },
        { name: "Мар-дель-Плата", population: 593000 },
        { name: "Мендоса", population: 112900 },
        { name: "Кордова", population: 1391000 }
    ]
};

var czech = {
    name: "Чехия",
    cities: [
        { name: "Прага", population: 1294513 },
        { name: "Конице", population: 2803 },
        { name: "Острава", population: 290450 },
        { name: "Кралики", population: 4224 },
        { name: "Пльзень", population: 170936 },
        { name: "Либерец", population: 103979 },
        { name: "Брно", population: 379527 }
    ]
};

var thailand = {
    name: "Таиланд",
    cities: [
        { name: "Аюттхая", population: 55025 },
        { name: "Кхонкэн", population: 120857 },
        { name: "Лампанг", population: 60591 },
        { name: "Пхукет", population: 74361 },
        { name: "Сонгкхла", population: 75408 },
        { name: "Транг", population: 59846 },
        { name: "Чианграй", population: 69261 }
    ]
};

var countries = [portugal, peru, argentina, czech, thailand];

function GetCountriesNameWithMaxCitiesCount(countriesArray) {
    var countriesNameWithMaxCitiesCount = [];
    var countryWithMaxCitiesCount = countriesArray[0];

    countriesNameWithMaxCitiesCount.push(countryWithMaxCitiesCount.name);

    for (var i = 1; i < countriesArray.length; i++) {
        if (countryWithMaxCitiesCount.cities.length < countriesArray[i].cities.length) {

            countryWithMaxCitiesCount = countriesArray[i];
            countriesNameWithMaxCitiesCount.splice(0, countriesNameWithMaxCitiesCount.length);
            countriesNameWithMaxCitiesCount.push(countryWithMaxCitiesCount.name);

        } else if (countryWithMaxCitiesCount.cities.length === countriesArray[i].cities.length) {

            countriesNameWithMaxCitiesCount.push(countriesArray[i].name);
        }
    }

    return countriesNameWithMaxCitiesCount;
};

function GetCountryPopulationDictionary(countriesArray) {
    var countryPopulationDictionary = [];

    countriesArray.forEach(function (item) {

        var initialValue = 0;
        var sum = item.cities.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.population;
        }, initialValue);

        countryPopulationDictionary[item.name] = sum;
    });

    return countryPopulationDictionary;
};

console.log(GetCountriesNameWithMaxCitiesCount(countries));
console.log(GetCountryPopulationDictionary(countries));