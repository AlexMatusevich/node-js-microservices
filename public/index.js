"use strict";

$(function () {
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
});