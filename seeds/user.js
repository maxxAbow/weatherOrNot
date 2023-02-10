const sequelize = require('../config/connection');
const { Users } = require('../models');

const userData = [
    {
        displayName: maxxAbow,
        emailAddress: 'mbowman@welland.com',
    },
];

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;