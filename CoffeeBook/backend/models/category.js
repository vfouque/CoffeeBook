'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.User, { through: models.UserCategory, foreignKey: 'categoryId', as: 'categoryUser' });
            this.belongsToMany(models.Post, { through: models.CategoryPost, foreignKey: 'categoryId', as: 'categoryPost' });
        }
    }
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Category',
            tableName: 'categories',
        }
    );
    return Category;
};
