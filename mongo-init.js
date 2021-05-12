"use strict";
const mongoose = require("mongoose");
const uri = "mongodb+srv://sistemasdistribuidos:Quique087@cluster0.xlfnt.mongodb.net/SistemasDistribuidos?retryWrites=true&w=majority";
mongoose.connect(uri);

module.exports = mongoose;

