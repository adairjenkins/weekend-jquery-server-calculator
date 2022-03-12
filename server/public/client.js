console.log('js');

$(handleReady);

// global variable to hold user input
const calculationObj = {
    num1 : '',
    num2: '',
    operator: '',
    result: ''
}

function handleReady() {
    console.log('jQuery');

    $('#calculator').on('click', '.number', handleNumber);
    $('#calculator').on('click', '.operator', handleOperator);
    $('#calculator').on('click', '.equals', handleEquals);
    $('#calculator').on('click', '.clear', reset);
    $('#clearHistory').on('click', clearHistory);

    getHistory();
}

function handleNumber() {
    console.log('handleNumber func');
    button = $(this).val();
    console.log('button:', button);

    if (calculationObj.operator === '') {
        calculationObj.num1 += button;
        console.log('num1:', calculationObj.num1);
        // display on calculator 
        updateCalcDisplay()
    }
    else {
        calculationObj.num2 += button;
        console.log('num2:', calculationObj.num2);
        // display on calculator 
        updateCalcDisplay()
    }
}

function handleOperator() {
    console.log('handleOperator func');
    calculationObj.operator = $(this).val();
    console.log('operator:', calculationObj.operator)
    // display on calculator 
    updateCalcDisplay()
}

function handleEquals() {
    console.log('handleEquals func');

    console.log('calculationObj:', calculationObj);
    // call func to make a POST request with new calculationObj
    postCalculation(calculationObj);
    
    reset()
    getHistory();
}

function reset() {
    console.log('reset func');
    // reset calculationObj values
    calculationObj.num1 = '';
    calculationObj.num2 = '';
    calculationObj.operator = '';
    // clear calculator display
    updateCalcDisplay();
}

//-------------------------------------------------
// POST request - sends obj to server where it is added to calculationHistory
function postCalculation(obj) {
    $.ajax({
        url: '/calculationHistory',
        method: 'POST',
        data: obj
    }).then(function(response) {
        console.log(response); // will be 'created' because of the 201
    })
}

// GET request - retrieves calculationHistory with updated results from server
function getHistory() {
    console.log('getHistory func');
    $.ajax({
        url: '/calculationHistory',
        method: 'GET'
    }).then( function(response) {
        // update DOM
        displayHistory(response);
    }).catch( function(error) {
        console.log('error');
    })
}

// displays list in DOM of all calculation objects in array
function displayHistory(calculationHistory) {
    // clear DOM
    $('#history').empty();
    for (const calculation of calculationHistory) {
        $('#history').append(`
            <li>${calculation.num1} ${calculation.operator} ${calculation.num2} = ${calculation.result}</li>
        `)
    }
}

// DELETE request to server and updates DOM 
function clearHistory() {
    console.log('clearHistory func')
    // DELETE request
    $.ajax({
        url: '/calculationHistory',
        type: 'DELETE',
        success: function (result) {
            console.log('DELETE request:', result);
        }
    });
    // update DOM
    getHistory();
}

// displays button input in DOM calculator display
function updateCalcDisplay() {
    $('#calcDisplay').val(calculationObj.num1 + 
                          calculationObj.operator +
                          calculationObj.num2);
}