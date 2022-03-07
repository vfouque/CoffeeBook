'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    async up(queryInterface, Sequelize) {
        let categoryposts = [];
        for (let i = 0; i < 100; i++) {
            let categoryRandomPost = [];
            let post = getRandomInt(4) + 1;
            for (let j = 0; j < post; j++) {
                let randomCategory = getRandomInt(100) + 1;
                while (categoryRandomPost.includes(randomCategory)) {
                    randomCategory = getRandomInt(100) + 1;
                }
                categoryposts.push({
                    postId: i + 1,
                    categoryId: randomCategory,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                categoryRandomPost.push(randomCategory);
            }
        }
        return queryInterface.bulkInsert('category_posts', categoryposts, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('category_posts', null, {});
    },
};
