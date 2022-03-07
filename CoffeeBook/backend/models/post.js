'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'postUser' });
            this.belongsToMany(models.User, { through: models.PostComment, foreignKey: 'postId', as: 'postUserComment' });
            this.belongsToMany(models.Category, { through: models.CategoryPost, foreignKey: 'postId', as: 'postCategory' });
            this.hasMany(models.PostComment, { foreignKey: 'postId', as: 'comments' });
        }
    }
    Post.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mediaLink: {
                type: DataTypes.STRING,
                defaultValue: 'https://picsum.photos/300/300',
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            voteAvg: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            abuseReport: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Post',
            tableName: 'posts',
        }
    );
    return Post;
};
