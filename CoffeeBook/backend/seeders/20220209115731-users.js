'use strict';
const casual = require('casual');

const users = [...Array(100)].map((user) => {
    return {
        email: casual.email,
        password: casual.password,
        firstName: casual.first_name,
        lastName: casual.last_name,
        createdAt: '1900-01-01',
        updatedAt: '1900-01-01',
    };
});

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', users, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    },
};
