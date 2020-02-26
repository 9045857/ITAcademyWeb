var countries = [
    {
        name: "Португалия",
        cities: [
            {
                name: "Лиссабон",
                population: 504718
            },
            {
                name: "Порту",
                population: 214349
            },
            {
                name: "Коимбра",
                population: 105842
            }
        ]
    },
    {
        name: "Перу",
        cities: [
            {
                name: "Лима",
                population: 9562280
            },
            {
                name: "Куско",
                population: 428450
            },
            {
                name: "Арекипа",
                population: 978009
            },
            {
                name: "Трухильо",
                population: 645000
            }
        ]
    },
    {
        name: "Аргентина",
        cities: [
            {
                name: "Буэнос-Айрес",
                population: 2890000
            },
            {
                name: "Сальта",
                population: 535050
            },
            {
                name: "Мар-дель-Плата",
                population: 593000
            },
            {
                name: "Мендоса",
                population: 112900
            },
            {
                name: "Кордова",
                population: 1391000
            }
        ]
    },
    {
        name: "Чехия",
        cities: [
            {
                name: "Прага",
                population: 1294513
            },
            {
                name: "Конице",
                population: 2803
            },
            {
                name: "Острава",
                population: 290450
            },
            {
                name: "Кралики",
                population: 4224
            },
            {
                name: "Пльзень",
                population: 170936
            },
            {
                name: "Либерец",
                population: 103979
            },
            {
                name: "Брно",
                population: 379527
            }
        ]
    },
    {
        name: "Таиланд",
        cities: [
            {
                name: "Аюттхая",
                population: 55025
            },
            {
                name: "Кхонкэн",
                population: 120857
            },
            {
                name: "Лампанг",
                population: 60591
            },
            {
                name: "Пхукет",
                population: 74361
            },
            {
                name: "Сонгкхла",
                population: 75408
            },
            {
                name: "Транг",
                population: 59846
            },
            {
                name: "Чианграй",
                population: 69261
            }
        ]
    }
];

function getCountriesWithMaxCitiesCount(countriesArray) {
    var maxCitiesCount = Math.max.apply(null, countriesArray.map(function (item) { return item.cities.length }));

    return countriesArray.filter(function (item) {
        return item.cities.length === maxCitiesCount
    });
}

function getCountryPopulationDictionary(countriesArray) {
    var countryPopulationDictionary = {};

    countriesArray.forEach(function (item) {
        var sum = item.cities.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.population;
        }, 0);

        countryPopulationDictionary[item.name] = sum;
    });

    return countryPopulationDictionary;
}

(function (array) {
    console.log("Страны:");
    console.log(array);

    console.log("Страна(ы) с максимальным количеством городов:");
    console.log(getCountriesWithMaxCitiesCount(array));

    console.log("Oбъект с информацией по всем странам такого вида: ключ название страны, значение суммарная численность по стране:");
    console.log(getCountryPopulationDictionary(array));
}(countries));