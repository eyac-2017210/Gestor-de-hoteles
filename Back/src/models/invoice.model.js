'use strict'

const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    hotel: {type: mongoose.Schema.ObjectId, ref: 'Hotel'},
    dateStart: Date,
    days: Number,
    total: Number,
    condition: String
})

module.exports = mongoose.model('Invoice', invoiceSchema);