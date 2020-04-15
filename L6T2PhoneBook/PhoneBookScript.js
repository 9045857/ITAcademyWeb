$(document).ready(function () {
    function getDeletePhrase(deletedContactsCount) {
        var lastDigit = deletedContactsCount % 10;

        var penultimateDigit = deletedContactsCount % 100 / 10;
        penultimateDigit = penultimateDigit - (penultimateDigit % 1);

        if (penultimateDigit === 1) {
            return "контактов";
        } else if (lastDigit === 1) {
            return "контакта";
        } else {
            return "контактов";
        }
    }

    function showDeleteMenu(table, rows, commonCheckbox) {
        var deletedContactsCount = rows.length;

        if (deletedContactsCount === 0) {
            return;
        }

        var newTitle = "Удаление " + deletedContactsCount + " " + getDeletePhrase(deletedContactsCount);

        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 300,
            modal: true,
            title: newTitle,
            close: function () {
                $("#screen-lock").addClass("do-not-show");

                if (rows.hasClass("for-removing")) {
                    rows.remove();
                    setRowOrder(table);
                    colorizeTable(table);

                    setCommonCheckboxChecked(table, commonCheckbox);
                } else {
                    rows.removeClass("is-delete-li");
                }
            },
            open: function () {
                $("#screen-lock").removeClass("do-not-show");
            },
            buttons: {
                "Да": function () {
                    rows.addClass("for-removing");
                    $(this).dialog("close");
                },
                "Нет": function () {
                    rows.removeClass("is-delete-li");
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

    function createNewRow() {
        return $("<tr>" +
            "<td><input type='checkbox'></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td><button type='button' title='Удалить контакт'></button></td>" +
            "</tr>)");
    }

    function setRowOrder(table) {
        var rows = table.children("tbody").eq(0).children("tr").not(".hidden");

        rows.each(function (index) {
            var numberColumnIndex = 1;
            var correctionCount = 1;
            $(this).children("td").eq(numberColumnIndex).text((index + correctionCount).toString());
        });
    }

    function setAllCheck(table, flag) {
        var tbody = table.find("tbody").eq(0);
        var visibleRows = tbody.find("tr").not(".hidden");

        visibleRows.each(function () {
            $(this).find("input:checkbox").prop("checked", flag);
        });
    }

    function setCommonCheckboxChecked(table, commonCheckbox) {
        commonCheckbox.prop("checked", areAllShownCellChecked(table));
    }

    function areAllShownCellChecked(table) {
        var tbody = table.children("tbody").eq(0);
        var shownRows = tbody.children("tr").not(".hidden");
        var shownRowCount = shownRows.length;
        var checkedCellsCount = shownRows.find("input:checkbox:checked").length;

        var emptyTableTrCount = 0;
        return (shownRowCount === checkedCellsCount) && (shownRowCount !== emptyTableTrCount);
    }

    function addContactToTable(table, contact, commonCheckbox) {
        var newRow = createNewRow();
        var cells = newRow.children("td");

        var checkbox = cells.eq(0).children("input:checkbox").eq(0);
        checkbox.click(function () {
            setCommonCheckboxChecked(table, commonCheckbox);
        });

        var rowsCount = table.children("tbody").eq(0).children("tr").not(".hidden").length;

        var correctionCount = 1;
        cells.eq(1).text((rowsCount + correctionCount).toString());

        cells.eq(2).text(contact.name);
        cells.eq(3).text(contact.surname);
        cells.eq(4).text(contact.phoneNumber);

        var deleteButton = cells.eq(5).children("button").eq(0);
        deleteButton.click(function () {
            var tr = $(this).closest("tr");
            showDeleteMenu(table, tr, commonCheckbox);
        });

        table.children("tbody").append(newRow);
        setCommonCheckboxChecked(table, commonCheckbox);
    }

    function deleteCheckedRows(table, commonCheckbox) {
        var tbody = table.children("tbody").eq(0);
        var checkedVisibleRows = tbody
            .find("input:checkbox:checked")
            .closest("tr")
            .not(".hidden");

        showDeleteMenu(table, checkedVisibleRows, commonCheckbox);
    }

    function clearSearch(input, table, commonCheckbox) {
        input.val("");

        var tbody = table.children("tbody").eq(0);
        var hiddenRows = tbody.find("tr.hidden");

        if (hiddenRows.length > 0) {
            hiddenRows.removeClass("hidden");
            setCommonCheckboxChecked(table, commonCheckbox);
        }
    }

    function isTextInRow(row, text) {
        var searchingArray = [];

        row.children("td").each(function () {
            searchingArray.push($(this).text().toLowerCase());
        });

        return searchingArray.some(function (currentString) {
            return currentString.indexOf(text.toLowerCase()) !== -1;
        });
    }

    function showSearchedRow(searchedText, table, commonCheckbox) {
        var hiddenClassName = "hidden";

        table.children("tbody").eq(0).children("tr").each(function () {
            $(this).toggleClass(hiddenClassName, !isTextInRow($(this), searchedText));
        });

        setCommonCheckboxChecked(table, commonCheckbox);
    }

    function colorizeTable(table) {
        var colorClass = "grey-background";
        var hiddenClassName = "hidden";

        var visibleRow = table.children("tbody").eq(0).children("tr").filter(function () {
            return !$(this).hasClass(hiddenClassName);
        });

        visibleRow.each(function (index) {
            $(this).toggleClass(colorClass, index % 2 === 0);
        });
    }

    function addSubStr(pos, str, subStr) {
        if (pos >= str.length) {
            return str + subStr;
        }

        var beforeSubStr = str.substring(0, pos);
        var afterSubStr = str.substring(pos, str.length);

        return beforeSubStr + subStr + afterSubStr;
    }

    function normalizePhoneNumber(phoneNumberText) {
        var cleanPhoneNumber = phoneNumberText.replace(/\s+/g, "");

        var maxPhoneNumberLength = 11;
        if (cleanPhoneNumber.length > maxPhoneNumberLength) {
            cleanPhoneNumber = cleanPhoneNumber.substring(0, maxPhoneNumberLength);
        }

        var spacesPosition = [2, 6, 10, 13];
        for (var i = 0; i < spacesPosition.length; i++) {
            if (cleanPhoneNumber.length < spacesPosition[i]) {
                break;
            }

            cleanPhoneNumber = addSubStr(spacesPosition[i], cleanPhoneNumber, " ");
        }
        return cleanPhoneNumber;
    }

    function isPhoneNumberCorrect(phoneNumber) {
        var rightPhoneNumberLength = 16;
        return phoneNumber.length === rightPhoneNumberLength;
    }

    function isEnteredAnyNumbers(phoneNumber) {
        var defaultNumbersCount = 3;
        return phoneNumber.length > defaultNumbersCount;
    }

    function isPhoneNumberInList(phoneNumber, table) {
        var phonesCells = table.children("tbody").children("tr").map(function () {
            var phoneCellIndex = 4;
            return $(this).children("td").eq(phoneCellIndex).text();
        }).get();

        return phonesCells.indexOf(phoneNumber) !== -1;
    }

    function toggleNewContactInputWarning(input, text, sign, flag) {
        var warningBorder = "warning-border";
        var hiddenWarningMessage = "hidden";

        text.toggleClass(hiddenWarningMessage, !flag);
        sign.toggleClass(hiddenWarningMessage, !flag);
        input.toggleClass(warningBorder, flag);
    }

    function checkPhoneReady(input, message, sign, table) {
        var arePhoneReady = true;

        var warningEmptyPhoneInput = "Введите телефон!";
        var warningContactInPhoneList = "Этот телефон уже в базе!";
        var warningLessNumbers = "Введите все цифры!";

        var phoneNumber = input.val();

        if (!isEnteredAnyNumbers(phoneNumber)) {
            message.text(warningEmptyPhoneInput);

            toggleNewContactInputWarning(input, message, sign, true);
            arePhoneReady = false;
        } else if (isEnteredAnyNumbers(phoneNumber) && !isPhoneNumberCorrect(phoneNumber)) {
            message.text(warningLessNumbers);

            toggleNewContactInputWarning(input, message, sign, true);
            arePhoneReady = false;
        } else if (isPhoneNumberInList(phoneNumber, table)) {
            message.text(warningContactInPhoneList);

            toggleNewContactInputWarning(input, message, sign, true);
            arePhoneReady = false;
        } else {
            toggleNewContactInputWarning(input, message, sign, false);
        }

        return arePhoneReady;
    }

    function checkNameReady(input, message, sign) {
        var name = input.val();

        if (name.trim() === "") {
            toggleNewContactInputWarning(input, message, sign, true);
            return false;
        }

        toggleNewContactInputWarning(input, message, sign, false);
        return true;
    }

    var phonesTable = $("#contact-table");

    colorizeTable(phonesTable);

    var commonDeleteCheckbox = $("#check-uncheck");
    commonDeleteCheckbox.click(function () {
        setAllCheck(phonesTable, $(this).prop("checked"));

        colorizeTable(phonesTable);
    });

    var surnameInput = $("#input-surname");
    var warningSurnameMessage = $("#warning-surname");
    var warningSurnameSign = $("#sign-surname");

    var nameInput = $("#input-name");
    var warningNameMessage = $("#warning-name");
    var warningNameSign = $("#sign-name");

    var phoneInput = $("#input-phone");
    var warningPhoneMessage = $("#warning-phone");
    var warningPhoneSign = $("#sign-phone");

    var contactAdditionButton = $("#input-button");
    contactAdditionButton.click(function () {
        var areContactDataReady = true;

        if (!checkNameReady(surnameInput, warningSurnameMessage, warningSurnameSign)) {
            areContactDataReady = false;
        }

        if (!checkNameReady(nameInput, warningNameMessage, warningNameSign)) {
            areContactDataReady = false;
        }

        if (!checkPhoneReady(phoneInput, warningPhoneMessage, warningPhoneSign, phonesTable)) {
            areContactDataReady = false;
        }

        if (!areContactDataReady) {
            return false;
        }

        var surname = surnameInput.val();
        var name = nameInput.val();
        var phoneNumber = phoneInput.val();

        var contact = new Contact(name, surname, phoneNumber);

        addContactToTable(phonesTable, contact, commonDeleteCheckbox);
        colorizeTable(phonesTable);

        nameInput.val("");
        surnameInput.val("");
        phoneInput.val("+7 ");

        return true;
    });

    surnameInput.focusin(function () {
        toggleNewContactInputWarning(surnameInput, warningSurnameMessage, warningSurnameSign, false);
    });

    nameInput.focusin(function () {
        toggleNewContactInputWarning(nameInput, warningNameMessage, warningNameSign, false);
    });

    phoneInput.focusin(function () {
        toggleNewContactInputWarning(phoneInput, warningPhoneMessage, warningPhoneSign, false);
    });

    var deleteAllCheckedButton = $("#delete-all-checked-button");
    deleteAllCheckedButton.click(function () {
        deleteCheckedRows(phonesTable, commonDeleteCheckbox);
    });

    var searchInput = $("#search-input");

    var inputClearingButton = $("#clear-input-button");
    inputClearingButton.click(function () {
        clearSearch(searchInput, phonesTable, commonDeleteCheckbox);

        setRowOrder(phonesTable);
        colorizeTable(phonesTable);
    });

    var searchButton = $("#search-input-button");
    searchButton.click(function () {
        var searchingInputText = $("#search-input").val().toString();
        showSearchedRow(searchingInputText, phonesTable, commonDeleteCheckbox);

        setRowOrder(phonesTable);
        colorizeTable(phonesTable);
    });

    phoneInput.click(function () {
        var fixedNumberPart = "+7 ";
        var positionNextNumber = fixedNumberPart.length;

        if (this.selectionStart < positionNextNumber) {
            this.setSelectionRange(positionNextNumber, positionNextNumber);
        }
    });

    phoneInput.keydown(function (e) {
        if (e.which !== 8 && e.which !== 46 &&
            e.which !== 37 && e.which !== 39 &&
            (e.which < 48 || e.which > 57) &&
            (e.which < 96 || e.which > 105)) {
            return false;
        }

        var fixedNumberPart = "+7 ";
        var positionNextNumber = fixedNumberPart.length + 1;

        if ((e.which === 37 || e.which === 39 || e.which === 8) && (this.selectionStart < positionNextNumber)) {
            if (this.value.length <= positionNextNumber) {
                $(this).val(fixedNumberPart + " ");
            }
            this.setSelectionRange(positionNextNumber, positionNextNumber);
        }

        if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
            var inputText = $(this).val();
            inputText = normalizePhoneNumber(inputText);
            $(this).val(inputText);
        }
        return true;
    });
});