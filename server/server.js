const express = require('express');
const bodyParser = require('body-parser');

// make a server
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

calculationHistory = [];

function calculate(calculationObj) {
    // convert strings to numbers
    num1 = Number(calculationObj.num1);
    num2 = Number(calculationObj.num2);
    // perform operation on num1 & num2
    switch(calculationObj.operator) {
        case '+':
            calculationObj.result = num1 + num2;
            break;
        case '-':
            calculationObj.result = num1 - num2;
            break;
        case '*':
            calculationObj.result = num1 * num2;
            break;
        case '/':
            calculationObj.result = num1 / num2;
            break;
        default: console.log('it did not work');
    }   
    // return calculationObj with updated result
    return calculationObj;
}

app.post('/calculationHistory', (req, res) => {
    // add new calculationObj to front of calculationHistory
    calculationHistory.unshift(calculate(req.body));
    
    console.log('POST', calculationHistory);
    // confirmation response to client 
    res.sendStatus(201); //200 -> ok, 201 -> created - 201 is customary for POST request
});

app.get('/calculationHistory', function(req, res) {
    // get route to /inventory
    console.log('GET /calculationHistory');
    //server must respond
    res.send(calculationHistory);
});









//-----------------------------------------------------------------------------
// start the server
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});