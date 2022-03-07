'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let big_friend_list = [];
for (let i = 0; i < 100; i++) {
    let friends = getRandomInt(10) + 1;
    let friendList = [];
    for (let j = 0; j < friends; j++) {
        let friendId = getRandomInt(100) + 1;
        while (friendList.includes(friendId) || friendId === i) {
            friendId = getRandomInt(100) + 1;
        }
        friendList.push(friendId);
    }
    big_friend_list.push(friendList);
}

let all_friends = [];

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < big_friend_list[i].length; j++) {
        all_friends.push({
            createdAt: '1900-03-03',
            updatedAt: '1900-03-03',
            userId: i + 1,
            friendId: big_friend_list[i][j],
        });
    }
}

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('user_friends', all_friends, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('user_friends', null, {});
    },
};
