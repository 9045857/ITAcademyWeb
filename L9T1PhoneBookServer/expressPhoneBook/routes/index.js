var express = require('express');
var router = express.Router();

var contacts = [{
    id: 1,
    surname: "Олег",
    name: "Ivan",
    phone: "87687600"
},
{
    id: 2,
    surname: "Petrov",
    name: "Semen",
    phone: "876234876"
},
{
    id: 3,
    surname: "Skvortsova",
    name: "Olga",
    phone: "1876111876"
}];

var newId = 4;

router.get('/getContacts', function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var filteredContacts = term.length === 0
        ? contacts
        : contacts.filter(function (c) {
            return c.surname.toUpperCase().indexOf(term) >= 0
                || c.name.toUpperCase().indexOf(term) >= 0
                || c.phone.toUpperCase().indexOf(term) >= 0;
        });

    res.send(filteredContacts);
});

router.post('/deleteContacts', function (req, res) {
    var deletingContactsIds = req.body.ids;

    deletingContactsIds.forEach(function (id) {
        contacts = contacts.filter(function (c) {
            return c.id !== id;
        });
    });

    res.send({
        success: true,
        message: null
    });
});

function getContactCheck(contact) {
    if (contact.surname.trim() === "") {
        return {
            success: false,
            field: "surname",
            message: "Введите фамилию!"
        };
    }

    if (contact.name.trim() === "") {
        return {
            success: false,
            field: "name",
            message: "Введите имя!"
        };
    }

    if (contact.phone.trim() === "") {
        return {
            success: false,
            field: "phone",
            message: "Введите номер телефона!"
        };
    }

    if (!contact.phone.trim().match(/^\d+$/)) {
        return {
            success: false,
            field: "phone",
            message: "Используйте только цифры!"
        };
    }

    var hasContactWithPhone = contacts.some(function (c) {
        return c.phone.toUpperCase() === contact.phone.toUpperCase();
    });

    if (hasContactWithPhone) {
        return {
            success: false,
            field: "phone",
            message: "Контакт с таким телефоном уже существует."
        };
    }

    return {
        success: true,
        field: null,
        message: null
    }
}

router.post("/addContact", function (req, res) {
    var contact = req.body.request;

    var responseLetter = getContactCheck(contact);

    if (responseLetter.success) {
        contact.id = newId;
        newId++;

        contacts.push(contact);
    }

    res.send(responseLetter);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'PhoneBookServer' });
});

module.exports = router;