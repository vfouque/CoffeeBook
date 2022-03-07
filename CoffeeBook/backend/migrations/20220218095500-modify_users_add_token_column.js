'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn('users', 'token', { type: Sequelize.STRING, defaultValue: null });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('users', 'token');
    },
};
