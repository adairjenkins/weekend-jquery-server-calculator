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
    $('#history').on('click', '.entry', reRunCalculation);
    $('#clearHistory').on('click', clearHistory);

    // update DOM
    getHistory();
    reset();
}

// stores num1 and num2 in calculationObj
function handleNumber() {
    console.log('handleNumber func');
    button = $(this).val();
    console.log('button:', button);
    // stores number input in num1 only if it precedes operator input
    if (calculationObj.operator === '') {
        calculationObj.num1 += button;
        console.log('num1:', calculationObj.num1);
        // display on calculator 
        updateCalcDisplay()
    }
    // store num2 only after operator has been added
    else {
        calculationObj.num2 += button;
        console.log('num2:', calculationObj.num2);
        // display on calculator 
        updateCalcDisplay()
    }
}

// stores operator in calculationObj
function handleOperator() {
    console.log('handleOperator func');
    calculationObj.operator = $(this).val();
    console.log('operator:', calculationObj.operator)
    // display on calculator 
    updateCalcDisplay()
}

// checks that appropriate data was entered; calls postCalculation to process
// data and getHistory to display calculations in DOM
function handleEquals() {
    console.log('handleEquals func');
    console.log('calculationObj:', calculationObj);
    // send calculationObj to server only if num1, num2, and operator have been assigned values
    if (calculationObj.num1 && calculationObj.num2 && calculationObj.operator) {
        // call func to make a POST request with new calculationObj
        postCalculation(calculationObj);
        // retrieve calculations
        getHistory();
        // clear calculationObj
        reset();
    }
    // alert if missing necessary data
    else {
        alert('Enter valid expression using positive numbers');
    }
}

// clears calculationObj values
function reset() {
    console.log('reset func');
    // reset calculationObj values
    calculationObj.num1 = '';
    calculationObj.num2 = '';
    calculationObj.operator = '';
    // clear calculator display
    $('#calcDisplay').val('');
}

// POST request - sends obj to server where it is added to calculationHistory
function postCalculation(obj) {
    $.ajax({
        url: '/calculationHistory',
        method: 'POST',
        data: obj
    }).then(function(response) {
        console.log('POST request:', response);
    })
}

// GET request - retrieves calculationHistory with updated results from server
// and calls displayCalculations func to update DOM
function getHistory() {
    console.log('getHistory func');
    $.ajax({
        url: '/calculationHistory',
        method: 'GET'
    }).then( function(response) {
        // update DOM
        displayCalculations(response);
    }).catch( function(error) {
        console.log('error');
    })
}

// displays list in DOM of all calculation objects in array
function displayCalculations(calculationHistory) {
    // clear DOM
    $('#history').empty();
    // loop through calculationHistory and display each entry
    for (const entry of calculationHistory) {
        $('#history').append(`
            <li class="entry" 
                data-num1="${entry.num1}" 
                data-num2="${entry.num2}" 
                data-operator="${entry.operator}" 
                data-result="${entry.result}">
            ${entry.num1} ${entry.operator} ${entry.num2} = ${entry.result}
            </li>
        `)
    }
    // display most recent result in calculator display
    $('#calcDisplay').val(calculationHistory[0].result);
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
    reset();
}

// re-enters clicked entry in calculator display; calculation will not run again
// until equals click event
function reRunCalculation() {
    console.log('reRunCalculation func');
    // retrieve values from data in entry
    calculationObj.num1 = $(this).data('num1');
    calculationObj.num2 = $(this).data('num2');
    calculationObj.operator = $(this).data('operator');
    calculationObj.result = $(this).data('result');

    console.log('retrieved:', calculationObj);
    $('#calcDisplay').val(calculationObj.num1 + 
        calculationObj.operator +
        calculationObj.num2);
}

// displays button input in DOM calculator display
function updateCalcDisplay() {
    if (calculationObj.result === '') {
        $('#calcDisplay').val(calculationObj.num1 + 
                              calculationObj.operator +
                              calculationObj.num2);
    }
}