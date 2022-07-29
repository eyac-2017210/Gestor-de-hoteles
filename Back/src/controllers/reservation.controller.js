'use strict'

const Reser = require('../models/reservation.model');
const User = require('../models/user.model');
const Hotel = require('../models/hotel.model');
const Room = require('../models/room.model');
const Event = require('../models/event.model');
const Invoice = require('../models/invoice.model');
const { validateData } = require('../utils/validate');

exports.pruebaReservation = async(req, res)=>{
    return res.send({message: 'Hola'});
}

exports.addRoomsToReservation = async(req, res)=>{
    try{

        const roomId = req.params.id;
        const params = req.body;
        const userLog = req.user.sub;
        const data = {
            dateStart: params.dateStart,
            days: params.days,
            room: roomId,
            quantity: params.quantity
        }
        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);
        const reserExist = await Reser.findOne({user: userLog});
        const roomExist = await Room.findOne({_id: roomId})
        .lean();
        if(params.days <= 0) return res.status(400).send({message: 'No se puede agregar la reservacion con dias menores o iguales a 0'});
        if(params.quantity <= 0) return res.status(400).send({message: 'No se puede agregar cantidad de habitaciones menor o igual a 0'})
        if(!roomExist) return res.status(400).send({message: 'Habitacion Inexistente'});
        if(reserExist){
            if(params.quantity > roomExist.available) return res.status(400).send({message: 'No contamos con suficientes habitaciones para la cantidad deseada'});
            for(let room of reserExist.rooms){
                if(roomId == data.room) return res.status(400).send({message: 'Ya cuentas con estas habitaciones en tu reservacion'});
            }
            const room = {
                room: params.room,
                subTotal: params.quantity * roomExist.price * params.days
            }
            const resta = {
                available: roomExist.available - params.quantity
            }
            const total1 = reserExist.rooms.map(room=>
                room.subTotal).reduce((prev, curr)=> prev + curr, 0)+ room.subTotal;
            const pushRoom = await Reser.findOneAndUpdate(
                {_id: reserExist._id},
                { $push: {rooms: room},
                total: reserExist.total + total1},
                {new: true}
            );
            const roomAva = await Room.findOneAndUpdate({_id: roomId}, resta, {new: true});
            return res.send({message: 'Nuevas habitaciones agregadas', pushRoom});
        }else{
            if(params.quantity > roomExist.available) return res.status(400).send({mesage: 'No contamos con suficientes habitaciones para la cantidad deseada'});
            const room = {
                room: roomId,
                subTotal: params.quantity * roomExist.price * params.days
            }
            const hotelExist = await Hotel.findOne({_id: roomExist.hotel});
            const data = {
                user: req.user.sub,
                dateStart: params.dateStart,
                days: params.days,
                quantity: params.quantity,
                hotel: hotelExist._id,
                rooms: room
            };
            const resta = {
                available: roomExist.available - params.quantity
            }
            data.total = room.subTotal;
            const reservation = new Reser(data);
            await reservation.save();
            const roomAva = await Room.findOneAndUpdate({_id: roomId}, resta, {new: true});
            return res.send({message: 'Habitacion/es agregadas satisfactoriamente', reservation});
        }

    }catch(err){
        console.log(err);
        return res.status(400).send({message: 'Error agregando la reservacion'});
    }
}

exports.addEventsToReservation = async(req, res)=>{
    try{

        const eventId = req.params.id;
        const userLog = req.user.sub;
        const data = {
            event: eventId
        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        const eventExist = await Event.findOne({_id: eventId});
        const reserExist = await Reser.findOne({user: userLog});
        const quantity = reserExist.quantity;
        if(eventExist.hotel.toString() != reserExist.hotel.toString()) return res.status(400).send({message: 'no se puede agregar eventos de un hotel diferente a las habitaciones'});
        if(reserExist){
            for(let event of reserExist.events){
                if(event.event == eventId) return res.status(400).send({message: 'Ya cuentas con este evento en tu reservacion'});
            }
            const event = {
                event: eventId,
                subTotal: quantity * reserExist.days * eventExist.price
            }
            const total2 = reserExist.events.map(event=>
                event.subTotal).reduce((prev, curr)=> prev + curr, 0) + event.subTotal;
            const pushEvent = await Reser.findOneAndUpdate(
                {_id: reserExist._id},
                { $push: {events: event},
                    total: reserExist.total + total2},
                {new: true}
            );
            return res.send({message: 'Nuevo evento añadido a la reservacion', pushEvent});
        }else{
            return res.status(400).send({message: 'Es necesaria iniciar la reservacion con las habitaciones, no es posible agregar eventos sin habitaciones'});
        }

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error agregando la reservacion'});
    }
}

exports.getReservation = async(req, res)=>{
    try{

        const userLog = req.user.sub;
        const reserExist = await Reser.findOne({user: userLog}).populate('hotel');
        if(!reserExist) return res.status(400).send({message: 'El usuario todavia no cuenta con reservaciones'});
        return res.send({message: 'Reservacion del hotel: ', reserExist});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error obteniendo reservacion'});
    }
}

exports.cancelReservation = async(req, res)=>{
    try{

        const userLog = req.user.sub;
        const reserExist = await Reser.findOne({user: userLog});
        if(!reserExist) return res.status(400).send({message: 'No cuenta con una reservacion'});
        const roomExist = reserExist.rooms;
        const quantity = roomExist[0];
        const roomsExist = await Room.findOne({_id: quantity.room});
        const data = {
            user: req.user.sub,
            hotel: reserExist.hotel,
            dateStart: reserExist.dateStart,
            days: reserExist.days,
            total: reserExist.total,
            condition: 'Reservacion cancelada'
        }
        const invo = new Invoice(data);
        await invo.save();

        const suma ={
            available: roomsExist.available + reserExist.quantity
        }
        const roomAva = await Room.findOneAndUpdate({_id: roomsExist}, suma, {new: true});
        const reserDeleted = await Reser.findOneAndDelete({_id: reserExist._id});
        if(!reserDeleted) return res.status(400).send({message: 'No se pudo cancelar la reservacion'});
        return res.send({message: 'Reservacion cancelada'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error cancelando reservacion'});
    }
}
exports.payReservation = async(req, res)=>{
    try{

        const params = req.body;
        const userLog = req.user.sub;
        const reserExist = await Reser.findOne({user: userLog});
        if(!reserExist) return res.status(400).send({message: 'Para poder realizar el pago, haga una reservacion'});
        const pay = params.pay;
        if(pay <= 0) return res.status(400).send({message: 'Porfavor, coloque un valor mayor al total a pagar'})
        if(pay>=reserExist.total){
            const roomExist = reserExist.rooms;
            const quantity = roomExist[0];
            const roomsExist = await Room.findOne({_id: quantity.room});
            const data = {
                user: req.user.sub,
                hotel: reserExist.hotel,
                dateStart: reserExist.dateStart,
                days: reserExist.days,
                total: reserExist.total,
                condition: 'Reservacion pagada'
            }
            const invo = new Invoice(data);
            await invo.save();
            const suma ={
                available: roomsExist.available + reserExist.quantity
            }
            const roomAva = await Room.findOneAndUpdate({_id: roomsExist}, suma, {new: true});
            const reserDeleted = await Reser.findOneAndDelete({_id: reserExist._id});
            if(!reserDeleted) return res.status(400).send({message: 'No se pudo realizar el pago de la reservacion'});
            return res.send({message: 'Reservacion pagada (El dinero sobrante es propina nuestra :D)'});
        }else if(pay<reserExist.total) return res.status(400).send({message: 'Saldo insuficiente para pagar la reservacion'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error realizando el pago de la reservacion'});
    }
}

