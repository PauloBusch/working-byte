const { NewId } = require('../../utils/database/random');

const EvaluationModel = (sequelize, dataTypes) => {
    const Evaluation = sequelize.define('evaluation', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        imc: {
            type: dataTypes.DOUBLE,
            allwNull: false
        },
        peso: {
            type: dataTypes.DOUBLE,
            allwNull: false
        },
        altura: {
            type: dataTypes.DOUBLE,
            allwNull: false
        },
        id_user_avaliador: {
            type: dataTypes.STRING(8),
            allwNull: false
        },
        id_user_avaliado: {
            type: dataTypes.STRING(8),
            allwNull: false
        },
        evaluation_created: dataTypes.DATE,
        evaluation_updated: dataTypes.DATE
    }, {
        createdAt: 'evaluation_created',
        updatedAt: 'evaluation_updated'
    });

    return Evaluation;
}

module.exports = {
    EvaluationModel
}