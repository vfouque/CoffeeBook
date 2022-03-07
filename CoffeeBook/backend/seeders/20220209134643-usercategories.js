'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    async up(queryInterface, Sequelize) {
        let categoryUsers = [];
        for (let i = 0; i < 100; i++) {
            let categoryRandomUser = [];
            let user = getRandomInt(4) + 1;
            for (let j = 0; j < user; j++) {
                let randomCategory = getRandomInt(100) + 1;
                while (categoryRandomUser.includes(randomCategory)) {
                    randomCategory = getRandomInt(100) + 1;
                }
                categoryUsers.push({
                    userId: i + 1,
                    categoryId: randomCategory,
                    createdAt: '1900-02-02',
                    updatedAt: '1900-02-02',
                });
                categoryRandomUser.push(randomCategory);
            }
        }
        return queryInterface.bulkInsert('user_categories', categoryUsers, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('user_categories', null, {});
    },
};
