'use strict';
const casual = require('casual');

const cats = [...Array(100)].map((category) => {
    return {
        name: casual.title,
        createdAt: '1899-01-01',
        updatedAt: '1899-01-01',
    };
});

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('categories', cats, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('categories', null, {});
    },
};
