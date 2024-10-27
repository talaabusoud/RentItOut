const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path if needed
const User = require('./userModel'); // Adjust if User model is in a different folder
const Item = require('./itemModel'); // Adjust if Item model is in a different folder

const Delivery = sequelize.define('Delivery', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Item,
            key: 'id',
        },
    },
    pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliveryStatus: {
        type: DataTypes.ENUM('Pending', 'In Transit', 'Completed'),
        defaultValue: 'Pending',
    },
}, {
    timestamps: true,
    tableName: 'deliveries', // Optional: Specify table name if needed
});

module.exports = Delivery;