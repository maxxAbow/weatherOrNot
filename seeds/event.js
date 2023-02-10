const sequelize = require('../config/connection');
const { Events } = require('../models');

const eventData = [
    {
        eventName: Bookclub,
        eventDate: 02-26-2023,
        eventTime: '18:00:00',
        eventLocation: Savannah,
        eventDescription: 'Meeting to discuss The Witchs Heart by Geniveive Gornichec',
    },
];

const seedEvents = () => Events.bulkCreate(eventData);
module.exports = seedEvents;