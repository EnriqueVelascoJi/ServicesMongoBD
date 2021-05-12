const mongoose = require("./mongo-init");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


//Craamos el servidor
const app = express();

//Settings
const PORT = process.env.PORT || 3000;

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Services
app.use(require('./services'));

app.listen(PORT, () => {

    console.log("Server running in port: ", PORT);
});