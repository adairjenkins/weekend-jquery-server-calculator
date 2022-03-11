const express = require('express');
const bodyParser = require('body-parser');

// make a server
const app = express();
const PORT = 5000;

calculationHistory = [];

// serve static files
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/calculationHistory', (req, res) => {
    // add button input objects to calculationHistory
    calculationHistory.push(req.body)
    
    console.log('POST', calculationHistory);
    // confirmation response to client 
    res.sendStatus(201); //200 -> ok, 201 -> created - 201 is customary for POST request
});









//-----------------------------------------------------------------------------
// start the server
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});