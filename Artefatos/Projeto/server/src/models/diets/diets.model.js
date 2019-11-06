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
        }
    });

    return Diet;
}

module.exports = {
    DietsModel
}