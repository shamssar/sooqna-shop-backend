'use strict';

const ratingModel = (sequelize, DataTypes) =>
    sequelize.define('ratings', {
        // name: {
        //     type: DataTypes.STRING,
        //     required: true
        // },
        description: {
            type: DataTypes.STRING,
            required: true
        },
        rating: {
            type: DataTypes.INTEGER,
            required: true
        },
        // foreign key
        product_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            // required: true
        }
    });
module.exports = ratingModel;
