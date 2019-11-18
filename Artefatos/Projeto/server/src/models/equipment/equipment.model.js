const { NewId } = require('../../utils/database/random');

const EquipmentModel = (sequelize, dataTypes) => {
    const Equipment = sequelize.define('equipment', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        code: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        is_disponible: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        id_type: {
            type: dataTypes.STRING(8),
            allowNull: false
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        equipment_created: dataTypes.DATE,
        equipment_updated: dataTypes.DATE
    },{
        createdAt: 'equipment_created',
        updatedAt: 'equipment_updated',
        indexes: [{
            name: 'UQ_code',
            unique: true,
            fields: ['code']
        }]
    });

    return Equipment;
}

module.exports = {
    EquipmentModel
}
