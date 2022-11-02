'use strict';

const categoryModel = (sequelize, DataTypes) =>
    sequelize.define('categories', {
        name: {
            type: DataTypes.STRING,
            required: true
        },
    });
module.exports = categoryModel;