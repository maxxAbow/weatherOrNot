const sequelize = require('../config/connection');
const seedEvents = require('./events');
const seedUsers = require('./users');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedEvents();

  await seedUsers();

  process.exit(0);
};

seedAll();