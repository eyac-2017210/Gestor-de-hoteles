'use strict'

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String, 
    price: Number,
    description: String,
    hotel: {type: mongoose.Schema.ObjectId, ref: 'Hotel'}
});

module.exports = mongoose.model('Event', eventSchema);