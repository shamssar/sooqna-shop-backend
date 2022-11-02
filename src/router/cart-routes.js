'use strict';

const { cart } = require('../models/index-model');

// Create new cart for specific User :
async function createCart(req, res) {
    let id = req.user.id;
    let obj = req.body;
    obj.user_id = id;
    let newRecord = await cart.create(obj);
    res.status(201).json(newRecord);
}

// Show all product in cart to see it ( For specific user using his ID ) :
async function getAllCart(req, res) {
    const user_id = req.user.id;
    let allRecords = await cart.getAll(user_id);
    res.status(200).json(allRecords);
}

// DELETE one product in specific user cart :
async function deleteOneCart(req, res) {
    let id = req.params.id;
    const id2 = req.user.id;
    console.log(" fffffffffffff",id," ",id2)
    let deletedRecord = await cart.delete(id, id2);
    console.log(" f555555555555555555",deletedRecord)

    if (deletedRecord == 0) {
        console.log("000000000" )
        res.status(403).send("Access denied");

    }
    res.status(204).json(deletedRecord);

}

// DELETE all products in specific user cart :
async function deleteAllCart(req, res) {
    const id = req.user.id;
    let deletedRecord = await cart.deleteAll(id);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).send('Record is deleted Successfully');
}

module.exports = {
    // Cart Functions : 
    getAllCart,
    createCart,
    deleteOneCart,
    deleteAllCart,
}