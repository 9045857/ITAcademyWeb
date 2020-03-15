$(document).ready(function () {
    function getAveragePeopleAge(people) {
        return _.chain(people)
            .pluck("age")
            .reduce(function(sum, item) {
                return sum + item;
            }, 0)
            .value() / _.size(people);
    }

    function getPeopleFrom20To30Age(people) {
        return _.chain(people)
            .filter(function (person) {
            return person.age >= 20 && person.age <= 30;
            })
            .sortBy("age")
            .value();
    }

    function setFullName(people) {

        return _.each(people, function(person) {
            person.fullName = person.lastName + " " + person.name;
        });
    }

    (function () {
        var people = [
            { age: 39, name: "Виктор", lastName: "Болотин" }, { age: 21, name: "Фёдор", lastName: "Левин" },
            { age: 24, name: "Камила", lastName: "Кабирова" }, { age: 23, name: "Анастасия", lastName: "Лопачева" },
            { age: 15, name: "Алиса", lastName: "Галиева" }, { age: 32, name: "Илья", lastName: "Кардаков" },
            { age: 15, name: "Алиса", lastName: "Чекурашева" }, { age: 38, name: "Элина", lastName: "Адабир" },
            { age: 35, name: "Елена", lastName: "Дзюбина" }, { age: 39, name: "Юлия", lastName: "Исаева" }
        ];

        console.log("Средний возраст людей: ");
        console.log(getAveragePeopleAge(people));

        console.log("список людей с возрастом от 20 до 30 включительно, по возрастанию возраста:");
        console.log(getPeopleFrom20To30Age(people));

        console.log("Список объектов с добавленным полным именем: ");
        console.log(setFullName(people));
    }());
});