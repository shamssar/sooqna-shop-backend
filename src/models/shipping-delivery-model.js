"use strict";

const shippingDeliveryModel = (sequelize, DataTypes) =>
    sequelize.define("shippingDelivery", {
        addressOne: {
            type: DataTypes.STRING,
        },
        addressTwo: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        postalCode: {
            type: DataTypes.INTEGER,
        },
        // foreign key
        user_id: {
            type: DataTypes.INTEGER,
        },
        order_id: {
            type: DataTypes.INTEGER,
        },
    });

module.exports = shippingDeliveryModel;