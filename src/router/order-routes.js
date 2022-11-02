'use strict';

const { order } = require('../models/index-model');

// Create new order :
async function CreateOrder(req, res) {
    let obj = req.body;
    obj.user_id = req.user.id;
    let newRecord = await order.create(obj);
    res.status(201).json(newRecord);
}

// Show all orders to see it :
async function getAllOrder(req, res) {
    const id = req.user.id;
    let allRecords = await order.getAll(id);
    res.status(200).json(allRecords);
}

// Update specific order :
async function UpdateOrder(req, res) {
    const id = req.params.id;
    const id2 = req.user.id;
    const obj = req.body;
    obj.user_id = id2;
    let updatedRecord = await order.update(id, obj, id2)
    if (updatedRecord) {
        res.status(201).json(updatedRecord);
    } else {
        res.status(403).send(`Access Denied`);
    }
}

// DELETE specific order :
async function deleteOneOrder(req, res) {
    const userId = req.user.id;
    const id = req.params.id;
    let deletedRecord = await order.delete(id, userId);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).json(deletedRecord);
}

// DELETE all orders :
async function deleteAllOrder(req, res) {
    const id = req.user.id;
    let deletedRecord = await order.deleteAll(id);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).json(deletedRecord);
    // res.status(204).send('Record is deleted Successfully');
}

module.exports = {
    // Orders Functions:
    getAllOrder,
    CreateOrder,
    UpdateOrder,
    deleteOneOrder,
    deleteAllOrder,
}