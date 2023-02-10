const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

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
    userID: {
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true
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