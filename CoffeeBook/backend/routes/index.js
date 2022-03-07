const express = require('express');
const router = express.Router();
const { Post, Category, User, PostComment } = require('../models');
const requireAuthenticate = require('../middlewares/requireAuthenticate');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/', requireAuthenticate, (req, res) => {
    res.send(`Welcome to CoffeeBook ! \n`);
});

// Get all posts by order of creation with offset=request and limit=10
router.post('/latestposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Post.findAll({
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['userId'] },
                include: [
                    { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                    { model: PostComment, as: 'comments', attributes: { exclude: ['userId', 'postId'] }, include: { model: User, as: 'user', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } } },
                ],
                offset: req.body.offset ? req.body.offset : 0,
                limit: 10,
            })
        )
    );
    res.send(posts);
});

//Get all posts by order of average note with offset=request and limit=10
router.post('/bestposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Post.findAll({
                order: [['voteAvg', 'DESC']],
                attributes: { exclude: ['userId'] },
                include: [
                    { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                    { model: PostComment, as: 'comments', attributes: { exclude: ['userId', 'postId'] }, include: { model: User, as: 'user', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } } },
                ],
                offset: req.body.offset ? req.body.offset : 0,
                limit: 10,
            })
        )
    );
    res.send(posts);
});

router.post('/getuserposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await User.findOne({
                where: { id: req.body.userId },
                include: {
                    model: Post,
                    as: 'userPost',
                    order: [['createdAt', 'DESC']],
                    include: ['postCategory', 'postUser'],
                },
            })
        )
    );
    res.send(posts);
});

router.post('/getcategoryposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Category.findOne({
                where: {
                    id: req.body.categoryId,
                },
                include: { model: Post, as: 'categoryPost', include: ['postCategory', 'postUser'] },
            })
        )
    );
    res.send(posts);
});

// Get posts by keyword with/without offset (JS filter by postTitle and categoryName)
router.post('/postsbykeyword', requireAuthenticate, async (req, res) => {
    if (req.body.filter) {
        const filterCondition = req.body.filter.toString().toLowerCase().replaceAll(' ', '');
        try {
            const posts = JSON.parse(
                JSON.stringify(
                    await Post.findAll({
                        order: [['createdAt', 'DESC']],
                        attributes: { exclude: ['userId'] },
                        include: [
                            { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                            { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                            { model: PostComment, as: 'comments', attributes: { exclude: ['userId', 'postId'] }, include: { model: User, as: 'user', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } } },
                        ],
                    })
                )
            );
            let filteredPosts = posts.filter((post) => {
                let postTitleCatNameConcat = (post.title + (post.postCategory.length > 0 ? post.postCategory.map((postCat) => postCat.name).join('') : '')).toLowerCase().replaceAll(' ', '');
                return postTitleCatNameConcat.includes(filterCondition);
            });
            res.send(filteredPosts.slice(req.body.offset ? req.body.offset : 0, req.body.offset ? req.body.offset + 10 : 10));
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).send('Filter string is not provided');
    }
});

// Get posts by keyword with/without offset (Sequelize filter by postTitle only)
// router.post('/postsbykeyword', requireAuthenticate, async (req, res) => {
//     if (req.body.filter) {
//         const filterCondition = req.body.filter.toString()
//         try {
//             const posts = JSON.parse(
//                 JSON.stringify(
//                     await Post.findAll({
//                         where: { title: { [Op.iLike]: `%${filterCondition}%` } },
//                         order: [['createdAt', 'DESC']],
//                         attributes: { exclude: ['userId'] },
//                         include: [
//                             { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
//                             { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
//                             { model: PostComment, as: 'comments', attributes: { exclude: ['userId', 'postId'] }, include: { model: User, as: 'user', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } } },
//                         ],
//                         offset: req.body.offset ? req.body.offset : 0,
//                         limit: 10,
//                     })
//                 )
//             );
//             res.send(posts);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     } else {
//         res.status(400).send('Filter string is not provided');
//     }
// });

module.exports = router;
