const Sequelize = require('sequelize');
const { UserModel } = require('./models/users/user.model');
const { EvaluationModel } = require('./models/evaluations/evaluation.model');

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
const EvaluationDb = EvaluationModel(Connection, Sequelize);
UserDb.hasMany(EvaluationDb, { foreignKey: 'id_user_avaliador' });
UserDb.hasMany(EvaluationDb, { foreignKey: 'id_user_avaliado' });

Connection.sync({ force: DbManager.overrideData })
  .then(() => console.log(`Tables created!`));

module.exports = { 
  UserDb,
  EvaluationDb,
  Connection
};