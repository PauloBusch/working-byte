const Sequelize = require('sequelize');
const { UserModel } = require('./models/users/user.model');

const { DbConfig, DbManager } = require('./../config');

const Connection = new Sequelize(DbConfig.database, DbConfig.user, DbConfig.password, {
  host: DbConfig.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const UserDb = UserModel(Connection, Sequelize);

Connection.sync({ force: DbManager.overrideData })
  .then(() => console.log(`Tables created!`));

module.exports = { 
  UserDb,
  Connection
};