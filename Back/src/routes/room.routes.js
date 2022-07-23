'use strict'

const express = require('express');
const roomController = require('../controllers/room.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/pruebaRoom', roomController.testRoom);
api.post('/saveRoom', [mdAuth.ensureAuth, mdAuth.isAdminHo],roomController.saveRoom);
api.get('/getRoomsByHotel', [mdAuth.ensureAuth, mdAuth.isAdminHo], roomController.getRoomsByAdmin);
api.get('/getRoomsById/:id', mdAuth.ensureAuth, roomController.getRoomsById);
api.get('/getRoom/:id', mdAuth.ensureAuth, roomController.getRoom);

api.put('/updateRoom/:id', [mdAuth.ensureAuth, mdAuth.isAdminHo], roomController.updateRoom);
api.delete('/deleteRoom/:id', [mdAuth.ensureAuth, mdAuth.isAdminHo], roomController.deleteRoom);

api.post('/saveRooms', [mdAuth.ensureAuth, mdAuth.isAdmin], roomController.saveRoomsByAdmin);

module.exports = api;