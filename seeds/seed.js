const sequelize = require('../config/connection');
const seedEvents = require('./event');
const seedUsers = require('./user');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedEvents();

  await seedUsers();

  process.exit(0);
};

seedAll();