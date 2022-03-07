'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserFriend extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'user' });
            this.belongsTo(models.User, { foreignKey: { name: 'friendId', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'friend' });
        }
    }
    UserFriend.init(
        {
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'UserFriend',
            tableName: 'user_friends',
        }
    );
    return UserFriend;
};
