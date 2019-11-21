const { NewId } = require('../../utils/database/random');

const CalendarModel = (sequelize, dataTypes) => {
    const Calendar = sequelize.define('calendars', {
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
            type: dataTypes.STRING(10),
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        timeInitial: {
            type: dataTypes.DATE,
            allowNull: false
        },
        timeEnd: {
            type: dataTypes.DATE,
            allowNull: false
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        calendar_created: dataTypes.DATE,
        calendar_updated: dataTypes.DATE
    },{
        createdAt: 'calendar_created',
        updatedAt: 'calendar_updated',
        indexes: [{
            name: 'UQ_code',
            unique: true,
            fields: ['name']
        }]
    });

    return Calendar;
}

module.exports = {
    CalendarModel
}