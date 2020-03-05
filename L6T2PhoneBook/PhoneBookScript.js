$(document).ready(function () {
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

    function uncheckCommonCheckbox() {
        $("#check-uncheck").prop("checked", false);
    }

    function checkCommonCheckbox() {
        $("#check-uncheck").prop("checked", true);
    }

    function areAllShownTdChecked(table) {
        var tbody = table.children("tbody").eq(0);
        var shownTrCount = tbody.children("tr").not(".hidden").length;
        var checkedTdCount = tbody.find("input:checkbox:checked").length;

        return shownTrCount === checkedTdCount;
    }

    function addContactInTable(table, contact) {
        var newTr = createNewTr();
        var tds = newTr.children("td");

        var checkbox = tds.eq(0).children("input:checkbox").eq(0);
        checkbox.click(function () {
            if (checkbox.prop("checked")) {

                if (areAllShownTdChecked(table)) {
                    checkCommonCheckbox();
                }
            } else {
                uncheckCommonCheckbox();
            }
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
            tr.remove();

            setTrOrder(table);
        });

        table.children("tbody").append(newTr);
        uncheckCommonCheckbox();
    }

    function deleteCheckedTrs(table) {
        var tbody = table.children("tbody").eq(0);
        var checkboxes = tbody.find("input:checkbox:checked");

        $.each(checkboxes, function (index, value) {
            value.closest("tr").remove();
        });
    }

    function clearSearch(input, table) {
        input.val("");

        var tbody = table.children("tbody").eq(0);
        var hiddenTrs = tbody.find("tr.hidden");

        if (hiddenTrs.length > 0) {
            hiddenTrs.each(function () {
                $(this).removeClass("hidden");
            });
            uncheckCommonCheckbox();
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


    (function () {
        var table = $("#contact-table");

        var contactAdditionButton = $("#input-button");
        contactAdditionButton.click(function () {
            var contact = createContact();
            addContactInTable(table, contact);
        });

        var commonCheckbox = $("#check-uncheck");
        commonCheckbox.click(function () {
            if ($(this).prop("checked")) {
                setAllCheck(table, true);
            } else {
                setAllCheck(table, false);
            }
        });

        var deleteAllCheckedButton = $("#delete-all-checked-button");
        deleteAllCheckedButton.click(function () {
            deleteCheckedTrs(table);
            setTrOrder(table);
            uncheckCommonCheckbox();
        });


        var searchInput = $("#search-input");

        var inputClearingButton = $("#clear-input-button");
        inputClearingButton.click(function () {
            clearSearch(searchInput, table);
            setTrOrder(table);
        });

        var searchButton = $("#search-input-button");
        searchButton.click(function () {
            var searchingInputText = $("#search-input").val().toString();
            //showSearchedTrExactText(searchingInputText, table);
            showSearchedTr(searchingInputText, table);

        });


    }());


});