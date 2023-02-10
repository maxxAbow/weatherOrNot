const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Events extends Model{}

Events.init(
    {
        eventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        eventTime:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        eventLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eventAttendees: {
           type: DataTypes.ARRAY,
           allowNull: true,
        }
    }
);


module.exports = Events;