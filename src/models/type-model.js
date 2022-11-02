'use strict';

const typeModel = (sequelize, DataTypes) =>
    sequelize.define('types', {
        name: {
            type: DataTypes.STRING,
        },
        catagory_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
    });
module.exports = typeModel;