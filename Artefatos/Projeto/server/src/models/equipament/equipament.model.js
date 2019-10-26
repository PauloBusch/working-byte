const { NewId } = require('../../utils/database/random');

const EquipamentModel = (sequelize, dataTypes) => {
    const Equipament = sequelize.define('equipament', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId
        }
    });
}

module.exports = {
    EquipamentModel
}