console.log('js');

$(handleReady);

let num1 = '';
let num2 = '';
let operator = '';
let result = 0;

function handleReady() {
    console.log('jQuery');

    $('#calculator').on('click', '.button', handleButtonClick)

}

function handleButtonClick() {
    console.log('handleButtonClick func');
    
    // builds num1 if operator has not yet been clicked
    if ($(this).hasClass('number') && operator === '') {
         console.log('clicked a number')
         num1 += $(this).val();
         console.log('num1:', num1);
    }
    // assigns operator +, -, *, or /
    else if ($(this).hasClass('operator')) {
        operator = $(this).val();
        console.log('operator:', operator)
    }
    // build num2
    else if ($(this).hasClass('number')) {
        num2 += $(this).val();
        console.log('num2:', num2);
    }
    // 
    else if ($(this).hasClass('equals')) {
        /// builds calculation object and prepares POST request
        const calculationObj = {
            num1: num1,
            num2: num2,
            operator: operator,
            result: result
        }
        console.log('calculationObj:', calculationObj);

        postRequest(calculationObj);
        
        calculationObj.num1 = '';
        calculationObj.num2 = '';
        calculationObj.operator = '';
        console.log(calculationObj);
        // HOW DO I RESET FOR A NEW CALCULATION? KEEP ADDING TO NUM2 INSTEAD

    }
}

function postRequest(obj) {
    $.ajax({
        url: '/calculationHistory',
        method: 'POST',
        data: obj
    }).then(function(response) {
        console.log(response); // will be 'created' because of the 201
    })
}