'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Post, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'userPost' });
            this.belongsToMany(models.User, { through: models.UserFriend, foreignKey: 'userId', as: 'userFriend' });
            this.belongsToMany(models.User, { through: models.UserFriend, foreignKey: 'friendId', as: 'friendUser ' });
            this.belongsToMany(models.Category, { through: models.UserCategory, foreignKey: 'userId', as: 'userCategory' });
            this.belongsToMany(models.Post, { through: models.PostComment, foreignKey: 'userId', as: 'userPostComment' });
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            profilePicturePath: {
                type: DataTypes.STRING,
                defaultValue: 'https://picsum.photos/300/300',
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }
    );
    return User;
};
