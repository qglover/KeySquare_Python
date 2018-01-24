"use strict";
window.onload = function () {
    $('.new-reg').submit(submitnewuser);
    $('.submit-new-user').click(function () {
        submitnewuser(-1);
    });
    $('.edit-user-form').submit(
        function (event) {
            submitedituser(this, event)
        });

    $('.submitedit').click(function () {
        submitedituser($(this).closest('form'), -1);
    });

    $('.roleLabel img').click(function () {
        $('.roleLabel img').css({ border: "2px #2f3ec9 solid" })
        $(this).css({ border: "2px #5273fe solid" })
    });

    $('.roleUpdateLabel img').click(function () {
        $('.roleUpdateLabel img').css({ border: "2px #2f3ec9 solid" })
        $(this).css({ border: "2px #5273fe solid" })
    });

    $('.adminDeleteImage').bind("click", function () {
         CreatePanelBorder($(this), 'delete');
    });

    $('.adminUpdateImage').bind("click", function () {
        CreatePanelBorder($(this), 'update');
    });



}

function CreatePanelBorder(obj, toggleswitch) {

    $('.updateDiv').each(function () {

        $(this).css('background-color', '#2f3ec9');
        $(this).find('img').removeClass('invert');
    });

    $(obj).find('.updateDiv').css('background-color', '#5273fe');
    $(obj).find('.updateDiv img').toggleClass('invert');


    var href_var = '';

    $('.panel' + href_var).toggleClass('panelborder');
    if (toggleswitch == 'delete') {

        href_var = $(obj).attr('href').substring(1, $(obj).attr('href').indexOf('_'));
        href_var = href_var.substring(('collapse').length );
    }
    else {
        href_var = $(obj).attr('href').substring(('collapse').length + 1);
    }

    $('.panel').each(function () {
        if ($(this).attr('data-id') != href_var) {
            $(this).removeClass('panelborder');
        }
    });

}

function submitnewuser(event) {

    if (typeof (event) != -1) {
        event.preventDefault();
    }
    $.ajax({
        type: "POST",
        url: 'User/Register',
        data: $('.new-reg').serialize(),
        success: function (result) {
            if (result.redirectTo) {
                window.location.href = result.redirectTo;
            } else {
                $("#backend-errors").html(result);
            }
        },
        error: function (x, y) {
            console.log(x, y)
        }
    });
    return false;
}

function submitedituser(form, event) {
    if (event != -1) {
        event.preventDefault();
    }
    $.ajax({
        type: "POST",
        url: 'User/Edit',
        data: $(form).serialize(),
        success: function (result) {
            if (result.Success) {
                $(form).find('.updated').css('display', 'block');
                // $(this).closest('.edit-success').fadeOut();
            } else {
                $(form).closest(".backend-errors").html(result);
            }
        },
        error: function (x, y) {
            console.log(x, y)
        }
    });
    return false;
}
