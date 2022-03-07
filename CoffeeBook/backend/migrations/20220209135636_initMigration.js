const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "categories", deps: []
 * createTable() => "users", deps: []
 * createTable() => "posts", deps: [users]
 * createTable() => "category_posts", deps: [categories, posts]
 * createTable() => "post_comments", deps: [posts, users]
 * createTable() => "user_categories", deps: [categories, users]
 * createTable() => "user_friends", deps: [users, users]
 *
 */

const info = {
  revision: 1,
  name: "initMigration",
  created: "2022-02-09T13:56:36.758Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "lastName",
          allowNull: false,
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          field: "isAdmin",
          allowNull: false,
          defaultValue: false,
        },
        profilePicturePath: {
          type: Sequelize.STRING,
          field: "profilePicturePath",
          allowNull: false,
          defaultValue: "https://picsum.photos/300/300",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "posts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        mediaLink: {
          type: Sequelize.STRING,
          field: "mediaLink",
          allowNull: false,
          defaultValue: "https://picsum.photos/300/300",
        },
        content: { type: Sequelize.TEXT, field: "content", allowNull: false },
        voteAvg: { type: Sequelize.FLOAT, field: "voteAvg", defaultValue: 0 },
        abuseReport: {
          type: Sequelize.INTEGER,
          field: "abuseReport",
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          name: "userId",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "category_posts",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "id",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "categories", key: "id" },
          unique: "category_posts_postId_categoryId_unique",
        },
        postId: {
          type: Sequelize.INTEGER,
          field: "postId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "posts", key: "id" },
          unique: "category_posts_postId_categoryId_unique",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "post_comments",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "id",
        },
        comment: { type: Sequelize.TEXT, field: "comment" },
        hasAbuse: {
          type: Sequelize.BOOLEAN,
          field: "hasAbuse",
          defaultValue: false,
        },
        vote: { type: Sequelize.INTEGER, field: "vote" },
        favorited: {
          type: Sequelize.BOOLEAN,
          field: "favorited",
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        postId: {
          type: Sequelize.INTEGER,
          field: "postId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "posts", key: "id" },
          unique: "post_comments_userId_postId_unique",
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          unique: "post_comments_userId_postId_unique",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_categories",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "id",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "categories", key: "id" },
          unique: "user_categories_userId_categoryId_unique",
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          unique: "user_categories_userId_categoryId_unique",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_friends",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "id",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          unique: "user_friends_friendId_userId_unique",
        },
        friendId: {
          type: Sequelize.INTEGER,
          field: "friendId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          unique: "user_friends_friendId_userId_unique",
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["category_posts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["posts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["post_comments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_friends", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
