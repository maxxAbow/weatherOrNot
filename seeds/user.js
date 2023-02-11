const sequelize = require('../config/connection');
const Users = require('../models/users');

const userData = [
    {
        displayName: 'maxxAbow',
        emailAddress: 'mbowman@welland.com',
        userId: 'kfdjri984kj'
    },
];

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;