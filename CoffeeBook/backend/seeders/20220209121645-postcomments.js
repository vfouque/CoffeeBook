'use strict';
const casual = require('casual');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomVote() {
    return Math.random() * (5 - 1) + 1;
}
function trueOrFalse() {
    let number = Math.floor(Math.random() * 2);
    if (number === 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    async up(queryInterface, Sequelize) {
        let commenters = [];
        const posts = await queryInterface.sequelize.query('SELECT * FROM "posts";', {
            type: queryInterface.sequelize.QueryTypes.SELECT,
        });
        for (let i = 0; i < posts.length; i++) {
            let yearCounter = 1;
            let initDate = posts[i].createdAt.toLocaleDateString('ko-KR').replaceAll('.', '');
            let dateArr = initDate.split(' ');

            let commentAmount = getRandomInt(10) + 1;
            for (let j = 0; j < commentAmount; j++) {
                let randomcommenter = getRandomInt(100) + 1;
                while (posts[0].author === randomcommenter) {
                    randomcommenter = getRandomInt(100) + 1;
                }
                let vote = getRandomVote();
                let favorited = trueOrFalse();
                let hasAbuse = trueOrFalse();
                dateArr[0] = parseInt(dateArr[0]) + yearCounter;
                let newDate = dateArr.join('-');
                commenters.push({
                    comment: casual.text,
                    vote: vote,
                    favorited: favorited,
                    hasAbuse: hasAbuse,
                    postId: i + 1,
                    userId: randomcommenter,
                    createdAt: newDate,
                    updatedAt: newDate,
                });
                yearCounter++;
            }
        }
        return queryInterface.bulkInsert('post_comments', commenters, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('post_comments', null, {});
    },
};
