const { NewId } = require('../../utils/database/random');

const ExerciseModel = (sequelize, dataTypes) => {
    const Exercise = sequelize.define('exercise', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        repetition: {
            type: dataTypes.INTEGER ,
            allowNull: true
        },
        charge: {
            type: dataTypes.INTEGER ,
            allowNull: true
        },
        sessions: {
            type: dataTypes.INTEGER ,
            allowNull: true
        },
        id_equipment: {
            type: dataTypes.STRING(8),
            allowNull: false
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        exercise_created: dataTypes.DATE,
        exercise_updated: dataTypes.DATE
    },{
        createdAt: 'exercise_created',
        updatedAt: 'exercise_updated',
        indexes: [{
            name: 'UQ_code',
            unique: true,
            fields: ['name']
        }]
    });

    return Exercise;
}

module.exports = {
    ExerciseModel
}