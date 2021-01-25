$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    createMerchant();
    updateConfirmationTab();
    inputFieldsChange();
    
});

function inputFieldsChange() {
    $('#submitMerchantInfoBtn').attr('disabled', true).attr('title', 'Please fill the required fields to submit').css('cursor', 'not-allowed');
    $(document).on('keyup', '.merchant-details', function() {
        var input = $(this);
        var inputValue = input.val();
        var errorElement = input.parent().find('small');
        errorElement.html('');
        toggleSubmitButton();
    });
}

function toggleSubmitButton() {
    var emptyFields = $('.merchant-details').filter(function() {
        return $.trim(this.value) === "";
    });

    if (emptyFields.length > 0) {
        $.each(emptyFields, function(index, value){
            var input = $(this);
            var errorElement = $(this).parent().find('small');
            if(input.val() === '') {
                errorElement.html('Required*').css('color', 'red');
            } else {
                errorElement.html('');
            }
        });
        $('#submitMerchantInfoBtn').attr('disabled', true).attr('title', 'Please fill the required fields to submit').css('cursor', 'not-allowed');
    } else {
        $('#submitMerchantInfoBtn').removeAttr('disabled').attr('title', 'Click to submit').css('cursor', 'pointer');
    }
}


function updateConfirmationTab() {
    $(document).on('change', 'input', function(){
        var input = $(this);
        var id = input.attr('id');
        var idClass = $(`.${id}`);
        idClass.html(input.val());
    });
}


function createMerchant(){
    $(document).on('click', '#addDirectDebitMerchantBtn', function() {
        var button = $(this);
        button.attr('disabled', true).css('cursor', 'not-allowed');
        button.find('i').show();

        var formInput = $('#addMerchantForm').serialize();

        var url = button.data('url');
        
        
        $.ajax({

            url: url,
            data: formInput,
            method: 'POST',

            success(response) {
                button.attr('disabled', false).css('cursor', 'pointer');
                button.find('i').hide();
                $('#addMerchantForm')[0].reset();
                $('#addEmailModal').modal('hide');
                swal({
                    title: 'Merchant Added!',
                    text: response.apiResponse.responseMessage,
                    icon: 'success',
                }).then((value) => {
                    swal({
                        title: "Please Wait",
                        closeOnClickOutside: false,
                        button: false,
                    })
                    window.location.href = response.redirect;
                });

            },

            error(response) {
                if(response.status.toString() == '422') {
                    $('#addEmailModal').modal('hide');
                    swal({
                        title: 'OOPS!',
                        text: 'You have errors in some of your fields. Correct them and submit again',
                        icon: 'error',
                    });
                    const errors = response.responseJSON.errors;
                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            const error = errors[key][0];
                            $(`#${key}error`).html(error).css('color', 'red');
                        }
                    }
                }
                else if(response.status.toString() == '404') {
                    $('#addEmailModal').modal('hide');
                    swal({
                        title: 'OOPS!',
                        text: response.responseJSON.responseMessage,
                        icon: 'error',
                    });
                }
                button.attr('disabled', false).css('cursor', 'pointer');
                button.find('i').hide();
            }

        });

    });

    $(document).on('click', '#submitMerchantInfoBtn', function(event) {
        event.preventDefault();
        $('#addEmailModal').modal('show');

    });
}
