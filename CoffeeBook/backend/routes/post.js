const express = require('express');
const { Post, CategoryPost } = require('../models');

const router = express.Router();
const requireAuthenticate = require('../middlewares/requireAuthenticate');

async function getLatestsPosts(req) {
    const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        include: ['postCategory', 'postUser'],
        offset: req.body.offset ? req.body.offset : 0,
        limit: 10,
    });
    return posts;
}

// Create post with/without categories associated and get back latest 10 posts with/without offset
router.post('/create', requireAuthenticate, async (req, res) => {
    console.log(req.body.postContent, req.body.postTitle, req.body.categoryId);
    if (req.body.postContent && req.body.postTitle) {
        try {
            Post.findOrCreate({ where: { title: req.body.postTitle, content: req.body.postContent, userId: req.session.user.id }, raw: true }).then(([newPost, created]) => {
                if (req.body.categoryId && created) {
                    Promise.all(req.body.categoryId.map(async (cat) => CategoryPost.findOrCreate({ where: { categoryId: cat, postId: newPost.id } }))).then(() => {
                        getLatestsPosts(req).then((posts) => res.json(posts));
                    });
                } else if (created) {
                    getLatestsPosts(req).then((posts) => res.json(posts));
                } else {
                    res.send([]);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    } else {
        res.status(400).send('Post Content or Post Title are not provided');
    }
});

module.exports = router;
