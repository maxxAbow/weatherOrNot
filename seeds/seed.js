const sequelize = require('../config/connection');
const seedEvents = require('./event');
const seedUsers = require('./user');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedEvents();

  process.exit(0);
};

seedAll();