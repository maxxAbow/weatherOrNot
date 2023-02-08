const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Users extends Model;

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
    },
    {
    sequelize,
    timestamps: false,
    modelName: 'users'
    }
);