'use strict'
const {shipping} = require('../models/index-model')
// Create new shipping :
async function createShipping(req, res) {
    const orderId = req.params.id;
    let obj = req.body;
    obj.order_id = orderId;
    let newRecord = await shipping.create(obj);
    res.status(201).json(newRecord);
}
//************Check it****************//
 
module.exports = createShipping; 