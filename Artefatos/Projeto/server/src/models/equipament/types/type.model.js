const { NewId } = require('../../../utils/database/random');

const TypeModel = (sequelize, dataTypes) => {
    const Type = sequelize.define('tipo_equipamento', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    });

    return Type;
}

module.exports = {
    TypeModel
}