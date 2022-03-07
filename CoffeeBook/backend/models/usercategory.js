'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserCategory.init(
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
            modelName: 'UserCategory',
            tableName: 'user_categories',
        }
    );
    return UserCategory;
};
