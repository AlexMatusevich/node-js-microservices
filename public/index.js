"use strict";

$(function () {
    $('#client-form').submit(function () {
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

        return false;
    });

    $('.show-clients-button').click(function () {
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

        return false;
    });

    $('.clients').delegate('li', 'click', function (event) {
        event.stopPropagation();

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
});