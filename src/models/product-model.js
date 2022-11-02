'use strict';

const productModel = (sequelize, DataTypes) =>
    sequelize.define('Products', {
        title: {
            type: DataTypes.STRING,
            required: true
        },
        description: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
            required: true
        },
        price: {
            type: DataTypes.STRING,
            required: true
        },
        quantity: {
            type: DataTypes.STRING,
            required: true
        },
        color: {
            type: DataTypes.STRING,
        },
        // foreign key
        cart_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        type_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        wishlist_id: {
            type: DataTypes.INTEGER,
        },
    });
module.exports = productModel;
