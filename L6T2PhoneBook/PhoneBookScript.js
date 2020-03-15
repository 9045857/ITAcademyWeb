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

    function createNewTr() {
        return $("<tr>" +
            "<td><input type='checkbox'></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td><button type='button' title='Удалить контакт'></button></td>" +
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
        var phonesTds = table.children("tbody").children("tr").map(function () {
            var phoneTdIndex = 4;
            return $(this).children("td").eq(phoneTdIndex).text();
        }).get();

        return phonesTds.indexOf(phoneNumber) !== -1;
    }

    function showWarning(element) {
        element.css("display", "block");
        setTimeout(function () {
            element.css("display", "none");
        }, 1000);
    }

    (function () {
        var table = $("#contact-table");

        colorizeTable(table);

        var commonCheckbox = $("#check-uncheck");
        commonCheckbox.click(function () {
            console.log("kj");
            if ($(this).prop("checked")) {
                setAllCheck(table, true);
            } else {
                setAllCheck(table, false);
            }

            colorizeTable(table);
        });

        var nameInput = $("#input-name");
        var surnameInput = $("#input-surname");
        var phoneNumberInput = $("#input-phone");

        var warningSurname = $("#warningSurname");
        var warningName = $("#warningName");
        var warningPhone = $("#warningPhone");
        var warningPhoneSpan = $("#warningPhone").children("span");

        var contactAdditionButton = $("#input-button");
        contactAdditionButton.click(function () {
            var surname = surnameInput.val();
            if (surname.length === 0) {
                showWarning(warningSurname);
                return false;
            }

            var name = nameInput.val();
            if (name.length === 0) {
                showWarning(warningName);
                return false;
            }

            var warningEmptyPhoneInput = "Введите телефон.";
            var warningContactInPhoneList = "Этот телефон уже в базе.";
            var warningFewNumbers = "Введите все цифры.";

            var phoneNumber = phoneNumberInput.val();

            if (!isEnteredAnyNumbers(phoneNumber)) {
                warningPhoneSpan.text(warningEmptyPhoneInput);
                showWarning(warningPhone);
                return false;
            } else if (isEnteredAnyNumbers(phoneNumber) && !isPhoneNumberCorrect(phoneNumber)) {
                warningPhoneSpan.text(warningFewNumbers);
                showWarning(warningPhone);
                return false;
            }

            if (isPhoneNumberInList(phoneNumber, table)) {
                warningPhoneSpan.text(warningContactInPhoneList);
                showWarning(warningPhone);
                return false;
            }

            var contact = new Contact(name, surname, phoneNumber);

            addContactInTable(table, contact, commonCheckbox);
            colorizeTable(table);

            nameInput.val("");
            surnameInput.val("");
            phoneNumberInput.val("+7 ");

            return true;
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
            showSearchedTr(searchingInputText, table);

            setTrOrder(table);
            colorizeTable(table);
        });

        phoneNumberInput.click(function () {

            var fixedNumberPart = "+7 ";
            var positionNextNumber = fixedNumberPart.length;// + 1;

            if (this.selectionStart < positionNextNumber) {
                this.setSelectionRange(positionNextNumber, positionNextNumber);
            }
        });

        phoneNumberInput.keydown(function (e) {
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
    }());
});