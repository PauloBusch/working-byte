const { NewIdentifier } = require('../utils/random');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING(8),
            defaultValue: NewIdentifier,
            primaryKey: true,
        },
        first_name: { 
            type: DataTypes.STRING(30),
            allowNull: false
        },
        last_name: { 
            type: DataTypes.STRING(60),
            allowNull: false
        },
        email: { 
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        address: { 
            type: DataTypes.STRING(200),
            allowNull: false
        },
        phone: { 
            type: DataTypes.STRING(20),
            allowNull: false
        },
        cpf: { 
            type: DataTypes.STRING(14),
            allowNull: false
        },
        age: DataTypes.INTEGER,
        is_personal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        sexo: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false
        },
        login: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        removed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['first_name','last_name']
            }
        ]
    });
  
    return User;
  }