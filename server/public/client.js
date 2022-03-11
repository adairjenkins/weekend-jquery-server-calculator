console.log('js');

$(handleReady);

// expression = ''; -----> do on the server end

function handleReady() {
    console.log('jQuery');

    $('#calculator').on('click', '.number', handleNumberClick);
    $('#calculator').on('click', '.operator', handleOperatorClick);
    $('#equals').on('click', handleEqualsClick);
    $('#clear').on('click', handleClearClick);
}

function handleNumberClick() {
    console.log('in handleNumberClick');
    number = $(this).val();
    console.log('clicked:', number);
}

function handleOperatorClick() {
    console.log('in handleOperatorClick');
    operator = $(this).val();
    console.log('clicked:', operator);
}

function handleEqualsClick() {
    console.log('in handleEqualsClick');
    console.log('clicked:', '=');
}

function handleClearClick() {
    console.log('in handleClearClick');
    console.log('clicked:', 'C');
}

