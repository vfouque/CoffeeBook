const { Post } = require('../models');

async function calculate() {
    let allPosts = JSON.parse(JSON.stringify(await Post.findAll({ include: 'postUserComment' })));
    for (let index = 0; index < allPosts.length; index++) {
        let totalVote = 0;
        let totalComments = 0;
        let totalAbuse = 0;
        for (let i = 0; i < allPosts[index].postUserComment.length; i++) {
            totalComments += 1;
            totalVote += allPosts[index].postUserComment[i].PostComment.vote;
            if (allPosts[index].postUserComment[i].PostComment.hasAbuse) {
                totalAbuse++;
            }
        }
        await Post.update(
            {
                voteAvg: parseFloat((totalVote / totalComments).toFixed(1)),
                abuseReport: totalAbuse,
            },
            { where: { id: index + 1 } }
        );
    }
    console.log('Done! Posts UPDATED');
}

calculate();
