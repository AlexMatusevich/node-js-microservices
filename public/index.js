"use strict";

$(function () {
    // Persons (Clients) functionality
    $('#client-form').submit(function () {
        event.stopPropagation();
        event.preventDefault();

        var data = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/person/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
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
                    html += `<li data-id="${id}">${fullName}</li>`;
                });

                $('.clients').html(html);
            }
        });
    });

    $('.clients').delegate('li', 'click', function (event) {
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

        var data = {
            title: $('#title').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/bank/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
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
                    html += `<li data-id="${id}">${title}</li>`;
                });

                $('.banks').html(html);
            }
        });
    });

    $('.banks').delegate('li', 'click', function (event) {
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

        var data = {
            bankId: $('#bankId').val(),
            personId: $('#personId').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/account/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
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
                    html += `<li data-id="${id}">Bank ID: ${bankId}, Person ID: ${personId}, Balance: ${balance}</li>`;
                });

                $('.accounts').html(html);
            }
        });
    });

    $('.accounts').delegate('li', 'click', function (event) {
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
});