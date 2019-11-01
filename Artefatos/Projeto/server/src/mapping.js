const Sequelize = require('sequelize');
const { UserModel } = require('./models/users/user.model');
const { EvaluationModel } = require('./models/evaluations/evaluation.model');
const { EquipamentModel } = require('./models/equipament/equipament.model');
const { TypeModel } = require('./models/equipament/types/type.model');

const { DbConfig, DbManager } = require('./../config');

const Connection = new Sequelize(DbConfig.database, DbConfig.user, DbConfig.password, {
  host: DbConfig.host,
  port: DbConfig.port,
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
const EquipamentDb = EquipamentModel(Connection, Sequelize);
const TypeDb = TypeModel(Connection, Sequelize);
UserDb.hasMany(EvaluationDb, { foreignKey: 'id_user_avaliador', as: 'avaliador' });
UserDb.hasMany(EvaluationDb, { foreignKey: 'id_user_avaliado', as: 'avaliado' });
EquipamentDb.hasOne(TypeDb, { foreignKey: 'id_type', as: 'type' });

EvaluationDb.belongsTo(UserDb, { foreignKey: 'id_user_avaliador', as: 'avaliador' });
EvaluationDb.belongsTo(UserDb, { foreignKey: 'id_user_avaliado', as: 'avaliado' });

Connection.sync({ force: DbManager.overrideData })
  .then(() => console.log(`Tables created!`));

module.exports = { 
  UserDb,
  TypeDb,
  EquipamentDb,
  EvaluationDb, 
  Connection
};