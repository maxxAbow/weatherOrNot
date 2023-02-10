const {Events} = require('../models');

const eventData = [
    {
        eventName: Bookclub,
        eventDate: 02-26-23,
        eventTime: '18:00:00',
        eventLocation: Albany,
        eventDescription: 'Meeting to discuss The Witchs Heart by Geneveive Gornichec',
        eventAttendees: {array, of, users},
    },
];

const seedEvents = () => Events.bulkCreate(eventData);
module.exports = seedEvents;