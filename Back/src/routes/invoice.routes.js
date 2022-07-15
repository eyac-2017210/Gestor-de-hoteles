'use strict'

const express = require('express');
const invoController = require('../controllers/invoice.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/getInovices', [mdAuth.ensureAuth], invoController.getInvoices);

module.exports = api;