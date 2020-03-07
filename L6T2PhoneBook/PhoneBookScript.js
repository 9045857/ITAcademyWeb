$(document).ready(function () {

    function getDeletePhrase(deletedContactsCount) {
        var divisionRemainderFirstNumber = deletedContactsCount % (10);
        var divisionRemainderSecondNumber = Math.trunc(deletedContactsCount % 100 / 10);

        if (divisionRemainderSecondNumber === 1) {
            return "контактов";

        } else if (divisionRemainderFirstNumber === 1) {
            return "контакта";

        } else {
            return "контактов";
        }
    }

    function showDeleteMenu(table, trs, commonCheckbox) {
        var deletedContactsCount = trs.length;

        if (deletedContactsCount === 0) {
            return;
        }

        var newTitle = "Удаление " + deletedContactsCount.toString() + " " + getDeletePhrase(deletedContactsCount);

        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 300,
            modal: true,
            title: newTitle,
            close: function () {
                $("#screen-lock").addClass("do-not-show");

                if (trs.hasClass("for-removing")) {
                    trs.remove();
                    setTrOrder(table);
                    colorizeTable(table);

                    //uncheckCommonCheckbox();
                    setCommonCheckboxChecked(table, commonCheckbox);
                } else {
                    trs.removeClass("is-delete-li");
                }
            },
            open: function () {
                $("#screen-lock").removeClass("do-not-show");
            },
            buttons: {
                "Да": function () {
                    trs.addClass("for-removing");
                    $(this).dialog("close");
                },
                "Нет": function () {
                    trs.removeClass("is-delete-li");
                    $(this).dialog("close");
                }
            }
        });
    }


    function Contact(name, surname, phoneNumber) {
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
    }

    function createContact() {
        var name = $("#input-name").val();
        var surname = $("#input-surname").val();
        var phoneNumber = $("#input-phone").val();

        return new Contact(name, surname, phoneNumber);
    }

    function createNewTr() {
        return $("<tr>" +
            "<td><input type='checkbox'></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td><button type='button'></button></td>" +
            "</tr>)");
    }

    function setTrOrder(table) {
        var trs = table.children("tbody").eq(0).children("tr").not(".hidden");

        trs.each(function (index) {
            var numberColumnIndex = 1;
            var correctionCount = 1;
            $(this).children("td").eq(numberColumnIndex).text((index + correctionCount).toString());
        });
    }

    function setAllCheck(table, flag) {
        var tbody = table.find("tbody").eq(0);
        var visibleTrs = tbody.find("tr").not(".hidden");

        visibleTrs.each(function () {
            $(this).find("input:checkbox").prop("checked", flag);
        });
    }

    function setCommonCheckboxChecked(table, commonCheckbox) {
        commonCheckbox.prop("checked", areAllShownTdChecked(table));
    }

    //function checkCommonCheckbox() {
    //    $("#check-uncheck").prop("checked", true);
    //}

    function areAllShownTdChecked(table) {
        var tbody = table.children("tbody").eq(0);
        var shownTrs = tbody.children("tr").not(".hidden");
        var shownTrCount = shownTrs.length;
        var checkedTdCount = shownTrs.find("input:checkbox:checked").length;

        var emptyTableTrCount = 0;
        return (shownTrCount === checkedTdCount) && (shownTrCount !== emptyTableTrCount);
    }

    function addContactInTable(table, contact, commonCheckbox) {
        var newTr = createNewTr();
        var tds = newTr.children("td");

        var checkbox = tds.eq(0).children("input:checkbox").eq(0);
        checkbox.click(function () {
            setCommonCheckboxChecked(table, commonCheckbox);
        });

        var trsCount = table.children("tbody").eq(0).children("tr").not(".hidden").length;

        var correctionCount = 1;
        tds.eq(1).text((trsCount + correctionCount).toString());

        tds.eq(2).text(contact.name);
        tds.eq(3).text(contact.surname);
        tds.eq(4).text(contact.phoneNumber);

        var deleteButton = tds.eq(5).children("button").eq(0);
        deleteButton.click(function () {
            var tr = $(this).closest("tr");
            showDeleteMenu(table, tr, commonCheckbox);
            //tr.remove();
        });

        table.children("tbody").append(newTr);
        setCommonCheckboxChecked(table, commonCheckbox);
    }

    function deleteCheckedTrs(table, commonCheckbox) {
        var tbody = table.children("tbody").eq(0);
        var checkedTrs = tbody.find("input:checkbox:checked").closest("tr");

        showDeleteMenu(table, checkedTrs, commonCheckbox);
    }

    function clearSearch(input, table, commonCheckbox) {
        input.val("");

        var tbody = table.children("tbody").eq(0);
        var hiddenTrs = tbody.find("tr.hidden");

        if (hiddenTrs.length > 0) {
            hiddenTrs.each(function () {
                $(this).removeClass("hidden");
            });
            setCommonCheckboxChecked(table, commonCheckbox);
        }
    }
    //альтернативый вариант функции для поиска с учетом регистра
    function showSearchedTrExactText(searchedText, table) {
        var hiddenClassName = "hidden";

        table.children("tbody").eq(0).children("tr").map(function () {

            if ($(this).is(":contains(" + searchedText + ")")) {
                return $(this).removeClass(hiddenClassName);
            } else {
                return $(this).addClass(hiddenClassName);
            }
        });
    }

    function isTextInTr(tr, text) {
        var searchingArray = [];

        tr.children("td").each(function () {
            searchingArray.push($(this).text().toLowerCase());
        });

        return searchingArray.some(function (currentString) {
            return currentString.includes(text.toLowerCase());
        });
    }

    function showSearchedTr(searchedText, table) {
        var hiddenClassName = "hidden";

        table.children("tbody").eq(0).children("tr").map(function () {
            if (isTextInTr($(this), searchedText)) {
                return $(this).removeClass(hiddenClassName);
            }
            else {
                return $(this).addClass(hiddenClassName);
            }
        });
    }

    function colorizeTable(table) {
        var colorClass = "grey-fon";
        var hiddenClassName = "hidden";

        var showedTr = table.children("tbody").eq(0).children("tr").filter(function () {
            return !$(this).hasClass(hiddenClassName);
        });

        showedTr.each(function (index) {
            if (index % 2 === 0) {
                return $(this).addClass(colorClass);
            }
            else {
                return $(this).removeClass(colorClass);
            }
        });
    }

    function deleteSymbolsFromText(text, symbols) {
        for (var i = 0; i < symbols.length; i++) {
            text = text.replace();


        }
    }

    function parsePhoneNumber(phoneNumberText) {




    }

    (function () {
        var table = $("#contact-table");

        colorizeTable(table);

        var commonCheckbox = $("#check-uncheck");
        commonCheckbox.click(function () {
            if ($(this).prop("checked")) {
                setAllCheck(table, true);
            } else {
                setAllCheck(table, false);
            }

            colorizeTable(table);
        });

        var contactAdditionButton = $("#input-button");
        contactAdditionButton.click(function () {
            var contact = createContact();
            addContactInTable(table, contact, commonCheckbox);

            colorizeTable(table);
        });



        var deleteAllCheckedButton = $("#delete-all-checked-button");
        deleteAllCheckedButton.click(function () {
            deleteCheckedTrs(table, commonCheckbox);
        });


        var searchInput = $("#search-input");

        var inputClearingButton = $("#clear-input-button");
        inputClearingButton.click(function () {
            clearSearch(searchInput, table, commonCheckbox);

            setTrOrder(table);
            colorizeTable(table);
        });

        var searchButton = $("#search-input-button");
        searchButton.click(function () {
            var searchingInputText = $("#search-input").val().toString();
            //showSearchedTrExactText(searchingInputText, table);
            showSearchedTr(searchingInputText, table);

            setTrOrder(table);
            colorizeTable(table);
        });


    }());


});