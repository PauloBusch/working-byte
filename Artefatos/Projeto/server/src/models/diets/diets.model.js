const { NewId } = require('../../utils/database/random');

const DietsModel = (sequelize, dataTypes) => {
    const Diet = sequelize.define('diet', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(2000),
            allowNull: false
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        diet_created: dataTypes.DATE,
        diet_updated: dataTypes.DATE
    }, {
        createdAt: 'diet_created',
        updatedAt: 'diet_updated',
        idexes: [{
            name: 'UQ_code',
            unique: true,
            fields: ['description']
        }]
    });

    return Diet;
}

module.exports = {
    DietsModel
}