"use strict";

const cartModel = (sequelize, DataTypes) =>
    sequelize.define("carts", {
        // totalprice: {
        //     type: DataTypes.INTEGER,
        //     required: true,
        //     defaultValue: 0,
        // },
        // quantity: {
        //     type: DataTypes.INTEGER,
        //     required: true,
        //     defaultValue: 0,
        //     // autoIncrement: true,
        // },
        // cart_id: {
        //     type: DataTypes.INTEGER,
        //     // autoIncrement: true,
        //     // primaryKey: true,
        // },
        // foreign key
        user_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
    });

// cartModel.removeAttribute('id');

module.exports = cartModel;