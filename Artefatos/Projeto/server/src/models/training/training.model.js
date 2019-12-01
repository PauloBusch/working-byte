const { NewId } = require('../../utils/database/random');

const TrainingModel = (sequelize, dataTypes) => {
    const Training = sequelize.define('training', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        id_personal: {
            type: dataTypes.STRING(10),
            allowNull: true
        },
        id_athlete: {
            type: dataTypes.STRING(10),
            allowNull: true
        },
        frequency: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        training_created: dataTypes.DATE,
        training_updated: dataTypes.DATE
    },{
        createdAt: 'training_created',
        updatedAt: 'training_updated',
        indexes: [{
            name: 'UQ_code',
            unique: true,
            fields: ['name']
        }]
    });

    return Training;
}

module.exports = {
    TrainingModel
}