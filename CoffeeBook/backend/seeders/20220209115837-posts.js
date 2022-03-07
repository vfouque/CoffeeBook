'use strict';
const casual = require('casual');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let posts = [];
for (let i = 0; i < 100; i++) {
    let randomAmountOfPosts = getRandomInt(10) + 1;
    for (let j = 0; j < randomAmountOfPosts; j++) {
        const randomDate = casual.date();
        posts.push({
            title: casual.title,
            content: casual.text,
            userId: i + 1,
            createdAt: randomDate,
            updatedAt: randomDate,
        });
    }
}

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('posts', posts, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('posts', null, {});
    },
};
