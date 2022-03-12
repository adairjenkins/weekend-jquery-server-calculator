const express = require('express');
const bodyParser = require('body-parser');

// make a server
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

let calculationHistory = [];

// performs operation on num1 and num2 and updates result
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

// receives new calculationObj from client, updates result property with
// calculate func, and adds calculationObj to front of calculationHistory array
app.post('/calculationHistory', (req, res) => {
    // receive new object, call calculate, update result, and add new
    // calculationObj to front of calculationHistory
    calculationHistory.unshift(calculate(req.body));    
    console.log('POST', calculationHistory);
    // confirmation response to client 
    res.sendStatus(201); // 201 -> created
});

// answers GET request from client and sends calculationHistory  
app.get('/calculationHistory', function(req, res) {
    // get route to /calculationHistory
    console.log('GET /calculationHistory');
    //server must respond
    res.send(calculationHistory);
});

// empties calculationHistory array when server receives DELETE request
app.delete('/calculationHistory', (req, res) => {
    // empty calculationHistory
    calculationHistory = [];
    console.log('DELETE calculationHistory');
    // confirmation response to client 
    res.sendStatus(200); // 200 -> Ok
});

//-----------------------------------------------------------------------------
// start the server
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});