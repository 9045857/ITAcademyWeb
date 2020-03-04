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

        console.log(visibleTrs);

        visibleTrs.each(function () {
            $(this).find("input:checkbox").prop("checked", flag);
        });
    }

    function addContactInTable(table, contact) {
        var newTr = createNewTr();
        var tds = newTr.children("td");

        var trsCount = table.children("tbody").eq(0).children("tr").length;
        var correctionCount = 1;
        tds.eq(1).text((trsCount - correctionCount).toString());

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
    }

    function deleteCheckedTrs(table) {
        var checkboxes = table.find("input:checkbox:checked");

        $.each(checkboxes, function (index, value) {
            value.closest("tr").remove();
        });
    }

    function clearSearch(input, table) {
        input.val("");

        var tbody = table.children("tbody").eq(0);
        var hiddenTrs = tbody.find("tr.hidden");

        hiddenTrs.each(function () {
            $(this).removeClass("hidden");
        });
    }

    (function () {
        var table = $("#contact-table");

        var contactAdditionButton = $("#input-button");
        contactAdditionButton.click(function () {
            var contact = createContact();
            addContactInTable(table, contact);
        });

        var checkAllButton = $("#check-all-button");
        checkAllButton.click(function () {
            setAllCheck(table, true);
        });

        var uncheckAllButton = $("#uncheck-all-button");
        uncheckAllButton.click(function () {
            setAllCheck(table, false);
        });

        var deleteAllCheckedButton = $("#delete-all-checked-button");
        deleteAllCheckedButton.click(function () {
            deleteCheckedTrs(table);
            setTrOrder(table);
        });


        var inputClearingButton = $("#clear-input-button");
        var searchInput = $("#search-input");
        inputClearingButton.click(function () {
            clearSearch(searchInput, table);
        });





    }());


});