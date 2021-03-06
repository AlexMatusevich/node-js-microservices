"use strict";

$(function () {
    // Persons (Clients) functionality
    $('#client-form').submit(function () {
        event.stopPropagation();
        event.preventDefault();

        let $firstName = $('#firstName');
        let $lastName = $('#lastName');

        let data = {
            firstName: $firstName.val(),
            lastName: $lastName.val()
        };

        if (!data.firstName || !data.lastName) {
            alert('At least one field has not been filled in');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/api/person/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                $firstName.val(null);
                $lastName.val(null);
                alert('Success');
            }
        });
    });

    $('.show-clients-button').click(function () {
        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: '/api/person/list',
            success: function (response) {
                let html = '';

                response.forEach(({fullName, id}) => {
                    html += `<li>${fullName} (ID: ${id}) <button data-id="${id}">Get</button></li>`;
                });

                $('.clients').html(html);
            }
        });
    });

    $('.clients').delegate('button', 'click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        let clientId = $(this).data('id');

        $.ajax({
            type: 'GET',
            url: '/api/person/get',
            data: {id: clientId},
            success: function (response) {
                console.log(response);
            }
        });
    });

    // Banks functionality
    $('#bank-form').submit(function () {
        event.stopPropagation();
        event.preventDefault();

        let $title = $('#title');

        let data = {
            title: $title.val()
        };

        if (!data.title) {
            alert('At least one field has not been filled in');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/api/bank/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                $title.val(null);
                alert('Success');
            }
        });
    });

    $('.show-banks-button').click(function () {
        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: '/api/bank/list',
            success: function (response) {
                let html = '';

                response.forEach(({title, id}) => {
                    html += `<li>${title} (ID: ${id}) <button data-id="${id}">Get</button></li>`;
                });

                $('.banks').html(html);
            }
        });
    });

    $('.banks').delegate('button', 'click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        let bankId = $(this).data('id');

        $.ajax({
            type: 'GET',
            url: '/api/bank/get',
            data: {id: bankId},
            success: function (response) {
                console.log(response);
            }
        });
    });

    // Accounts functionality
    $('#account-form').submit(function () {
        event.stopPropagation();
        event.preventDefault();

        let $bankId = $('#bankId');
        let $personId = $('#personId');

        let data = {
            bankId: $bankId.val(),
            personId: $personId.val()
        };

        if (!data.bankId || !data.personId) {
            alert('At least one field has not been filled in');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/api/account/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                $bankId.val(null);
                $personId.val(null);
                alert('Success');
            }
        });
    });

    $('.show-accounts-button').click(function () {
        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: '/api/account/list',
            success: function (response) {
                let html = '';

                response.forEach(({bankId, personId, id, balance}) => {
                    html += `<li>Bank ID: ${bankId}, Person ID: ${personId}, Balance: ${balance} (ID: ${id}) <button data-id="${id}">Get</button></li>`;
                });

                $('.accounts').html(html);
            }
        });
    });

    $('.accounts').delegate('button', 'click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        let accountId = $(this).data('id');

        $.ajax({
            type: 'GET',
            url: '/api/account/get',
            data: {id: accountId},
            success: function (response) {
                console.log(response);
            }
        });
    });

    $('#update-account-form').submit(function () {
        event.stopPropagation();
        event.preventDefault();

        let $accountId = $('#accountId');
        let $value = $('#value');

        let data = {
            id: $accountId.val(),
            value: $value.val()
        };

        if (!data.id || !data.value) {
            alert('At least one field has not been filled in');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: '/api/account/update',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                $accountId.val(null);
                $value.val(null);
                alert('Success');
            }
        });
    });

    // Transactions functionality
    $('#transaction-form').submit(function () {
        event.stopPropagation();
        event.preventDefault();

        let $senderAccountId = $('#senderAccountId');
        let $recipientAccountId = $('#recipientAccountId');
        let $value = $('#transactionValue');

        let data = {
            senderAccountId: $senderAccountId.val(),
            recipientAccountId: $recipientAccountId.val(),
            value: $value.val()
        };

        if (!data.senderAccountId || !data.recipientAccountId || !data.value) {
            alert('At least one field has not been filled in');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/api/transaction/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                $senderAccountId.val(null);
                $recipientAccountId.val(null);
                $value.val(null);

                alert('Success');
            }
        });
    });

    $('.show-transactions-button').click(function () {
        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: '/api/transaction/list',
            success: function (response) {
                let html = '';

                response.forEach(({senderAccountId, recipientAccountId, id, value}) => {
                    html += `<li>Sender Account ID: ${senderAccountId}, Recipient Account ID: ${recipientAccountId}, Value: ${value} (ID: ${id}) <button data-id="${id}">Get</button></li>`;
                });

                $('.transactions').html(html);
            }
        });
    });

    $('.transactions').delegate('button', 'click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        let transactionId = $(this).data('id');

        $.ajax({
            type: 'GET',
            url: '/api/transaction/get',
            data: {id: transactionId},
            success: function (response) {
                console.log(response);
            }
        });
    });

    // Balance functionality
    $('#balance-form').submit(function () {
        event.stopPropagation();
        event.preventDefault();

        let $accountId = $('#balanceAccountId');
        let $bankId = $('#balanceBankId');
        let $personId = $('#balancePersonId');

        let data = {
            accountId: $accountId.val(),
            bankId: $bankId.val(),
            personId: $personId.val()
        };

        if (!data.accountId && !data.bankId && !data.personId) {
            alert('No one field has been filled in');
            return;
        }

        $.ajax({
            type: 'GET',
            url: '/api/balance/get',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                $accountId.val(null);
                $bankId.val(null);
                $personId.val(null);

                $('.balance').text(response.balance);
            }
        });
    });
});