const { NewId } = require('../../../utils/database/random');

const DietTypeModel = (sequelize, dataTypes) => {
    const Type = sequelize.define('tipo_dieta', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(8),
            allowNull: false
        }
    });
    
    return Type;

}

module.exports = {
    DietTypeModel
};