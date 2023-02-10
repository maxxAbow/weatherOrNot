const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const { v4: uuidv4 } = require('uuid');

class Users extends Model{}

Users.init(
    {
    displayName: {
        type: DataTypes.STRING,
        allowNull: false
        },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false
        },
    createDate: {
        type: DataTypes.DATE,
        allowNull: false
        },
    uuidv4: {
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
        },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
    sequelize,
    timestamps: false,
    modelName: 'users'
    }
);

module.exports = Users;