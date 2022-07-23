'use strict'

const Invoice = require('../models/invoice.model');
const User = require('../models/user.model');

exports.getInvoices = async(req, res)=>{
    try{
        const userLog = req.user.sub;
        const invoices = await Invoice.find({user: userLog}).populate('hotel').populate('user').lean();
        if(invoices.length == 0){
            res.status(400).send({message: 'Facturas no encontradas'});
        }else{
            return res.send({message: 'Facturas', invoices});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error obteniendo facturas'});
    }
}