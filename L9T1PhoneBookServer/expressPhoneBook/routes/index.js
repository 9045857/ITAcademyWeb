var express = require('express');
var router = express.Router();

var contacts = [{
        id: 1,
        name: "Ivan",
        phone: "87687600"
    },
    {
        id: 2,
        name: "Oleg",
        phone: "876234876"
    },
    {
        id: 3,
        name: "Nike",
        phone: "1876111876"
    }];
//{id:1, name:"Ivan", phone: "876876" }

var newId = 4;

router.get('/getContacts', function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var filteredContacts = term.length === 0
        ? contacts
        : contacts.filter(function (c) {
            return c.name.indexOf(term) >= 0
                || c.phone.indexOf(term) >= 0;
        });

    res.send(filteredContacts);
});

router.post('/deleteContact', function (req, res) {
    var id = req.body.id;

    var contact = contacts.find(function (c) {
        return c.id === id;
    });

    if (contact === undefined) {
        res.send({
            success: true,
            message: "Contact with id=" + id + " not found."
        });

        return;
    }

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/addContact", function (req, res) {
    var contact = req.body.request;

    var hasContactWithPhone = contacts.some(function (c) {
        return c.phone.toUpperCase() === contact.phone.toUpperCase();
    });

    if (hasContactWithPhone) {
        res.send({
            success: false,
            message: "Contact with phone (" + contact.phone + ") already exists."
        });

        return;
    }

    contact.id = newId;
    newId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'PhoneBookServer' });
});

module.exports = router;