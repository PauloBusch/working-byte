const Sequelize = require('sequelize');
const UserModel = require('../models/user');

const sequelize = new Sequelize('workingbyte', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize);

//force: true, recria o banco
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = { User };