console.log('js');

$(handleReady);

// expression = ''; -----> do on the server end

function handleReady() {
    console.log('jQuery');

    $('#calculator').on('click', '.button', handleButtonClick);
}

// POSTs client button input to the server
function handleButtonClick() {
    console.log('in handleButtonClick');
    button = $(this).val();
    console.log('clicked:', button);

    $.ajax({
        url: '/expressionArray',
        method: 'POST',
        data: { 
            buttonInput: button
        }
    }).then(function(response) {
        console.log(response, 'POST', {buttonInput: button}); // will be 'Created' because of the 201
    })
}
