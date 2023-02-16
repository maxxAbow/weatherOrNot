// const {Model, DataTypes} = require('sequelize');
// const sequelize = require('../config/connection');
// // Import the Events model
// const Events = require('./events');

// class Users extends Model{}

// Users.init(
//     {
//     displayName: {
//         type: DataTypes.STRING,
//         allowNull: false
//         },
//     emailAddress: {
//         type: DataTypes.STRING,
//         allowNull: false
//         },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     createDate: {
//         type: DataTypes.DATE,
//         allowNull: false
//         },
//     userId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//         },
//     },
//     {
//     sequelize,
//     timestamps: false,
//     modelName: 'users'
//     }
// );


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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'users'
  }
);

// Export the Users model
module.exports = Users;
