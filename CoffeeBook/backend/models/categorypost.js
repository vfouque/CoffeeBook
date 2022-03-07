'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryPost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CategoryPost.init(
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
            modelName: 'CategoryPost',
            tableName: 'category_posts',
        }
    );
    return CategoryPost;
};
