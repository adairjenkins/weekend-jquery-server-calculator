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

    $('#calculator').on('click', '.button', handleButtonClick)

    getHistory();
}

// handles 4 different button click scenarios: 
function handleButtonClick() {
    console.log('handleButtonClick func');
    
    // build num1 from button input if operator has not yet been clicked
    if ($(this).hasClass('number') && calculationObj.operator === '') {
        console.log('clicked a number')
        calculationObj.num1 += $(this).val();
        console.log('num1:', calculationObj.num1);
        // display on calculator 
        calcDisplay()
    }
    // stores operator in calculationObj
    else if ($(this).hasClass('operator')) {
        calculationObj.operator = $(this).val();
        console.log('operator:', calculationObj.operator)
        // display on calculator 
        calcDisplay()
    }
    // build num2
    else if ($(this).hasClass('number')) {
        calculationObj.num2 += $(this).val();
        console.log('num2:', calculationObj.num2);
        calcDisplay()
    }
    // 
    else if ($(this).hasClass('equals')) {
        
        console.log('calculationObj:', calculationObj);

        // call func to make a POST request with new calculationObj
        postCalculation(calculationObj);
        
        // reset calculationObj values
        calculationObj.num1 = '';
        calculationObj.num2 = '';
        calculationObj.operator = '';
        
        console.log(calculationObj);
    }
    getHistory();
}

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

// displays list in DOM of all previous calculations 
function displayHistory(calculationHistory) {
    // clear DOM
    $('#history').empty();
    for (const calculation of calculationHistory) {
        $('#history').append(`
            <li>${calculation.num1} ${calculation.operator} ${calculation.num2} = ${calculation.result}</li>
        `)
    }
}

// displays button input in DOM calculator display
function calcDisplay() {
    $('#calcDisplay').val(calculationObj.num1 + 
                          calculationObj.operator +
                          calculationObj.num2);
}