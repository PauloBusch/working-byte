const { NewId } = require('../../utils/database/random');

const PaymentsModel = (sequelize, dataTypes) => {
    const Payments = sequelize.define('payments', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        }, 
        name: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        value: {
            type: dataTypes.DECIMAL(8, 2),
            allowNull: false
        },
        day: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [{
            name: 'UQ_name',
            unique: true,
            fields: ['name']
        }]
    });

    return Payments;
}

module.exports = {
    PaymentsModel
 }