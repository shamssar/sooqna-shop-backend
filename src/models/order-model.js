"use strict";

const orderModel = (sequelize, DataTypes) =>
    sequelize.define("orders", {
        date: {
                  type: DataTypes.DATE,
                  defaultValue: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                  })           
        },
        quantity: {
            type: DataTypes.STRING,
            required: true,
        },
        status: {
            type: DataTypes.STRING,
            required: true,
            defaultValue: 'submitted',
        },
        adress: {
            type: DataTypes.STRING,
        },
        payment_method: {
            type: DataTypes.STRING,
        },
        total_price: {
            type: DataTypes.STRING,
        },
        isRecived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        // foreign key
         product_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
    });

module.exports = orderModel;