const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
    id:  String, // String is shorthand for {type: String}
    name: String,
    description:   String,
    ip: String,
    port: String,
    ranking: String
    },
    {
        strict: false, versionKey: false 
    }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;