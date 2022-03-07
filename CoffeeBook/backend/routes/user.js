const express = require('express');
const router = express.Router();
const { User, UserCategory, UserFriend } = require('../models/index');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

async function getFavoriteCategoriesOfUser(req, res) {
    try {
        const userCats = JSON.parse(
            JSON.stringify(
                await User.findOne({
                    where: {
                        id: req.params.userId,
                    },
                    order: [['createdAt', 'DESC']],
                    include: 'userCategory',
                })
            )
        );
        let cats = userCats.userCategory.map((cat) => {
            return { id: cat.id, name: cat.name };
        });
        res.status(200).send(cats);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getContacts(req, res) {
    try {
        const userContacts = await UserFriend.findAll({ where: { userId: req.body.userId }, include: { all: true }, nest: true, raw: true });
        let contacts = userContacts.map((contact) => {
            const { id, firstName, lastName, isAdmin, profilePicturePath } = contact.friend;
            return { id, firstName, lastName, isAdmin, profilePicturePath };
        });
        res.status(200).send(contacts);
    } catch (error) {
        res.status(400).send('User not provided');
    }
}

// Get all favorite categories of a user by descending addition date
router.post('/:userId/categories', async (req, res) => {
    if (req.session.user) {
        getFavoriteCategoriesOfUser(req, res);
    } else {
        res.status(401).send('Please login first');
    }
});

// Add a favorite category to a user
router.post('/:userId/category', requireAuthenticate, async (req, res) => {
    const { categoryId } = req.body;
    try {
        await UserCategory.findOrCreate({
            where: {
                userId: req.params.userId,
                categoryId: categoryId,
            },
        });
        getFavoriteCategoriesOfUser(req, res);
    } catch (err) {
        console.log(`Error while saving favorite category ${categoryId} to user ${req.params.userId}`);
        res.status(200).send('Error while saving favorite category for user');
    }
});

// Remove a favorite category from a user
router.delete('/:userId/category/:categoryId', requireAuthenticate, async (req, res) => {
    try {
        const deleted = await UserCategory.destroy({
            where: {
                userId: req.params.userId,
                categoryId: req.params.categoryId,
            },
        });
        if (deleted) {
            getFavoriteCategoriesOfUser(req, res);
        }
    } catch (err) {
        console.log(`Error while removing favorite category ${req.params.categoryId} from user ${req.params.userId}`);
        res.status(200).send('Error while removing favorite category from user');
    }
});

// Get users by filter
router.post('/filter', requireAuthenticate, async (req, res) => {
    if (req.body.filter && req.session.user.id) {
        const filterCondition = req.body.filter.toString().toLowerCase().replaceAll(' ', '');
        try {
            let allUsers = await User.findAll({ attributes: {exclude: ['password', 'token', 'createdAt', 'updatedAt']}, raw: true });
            let filteredUsers = allUsers.filter((user) => {
                let nameConcat = (user.firstName + user.lastName).toLowerCase().replaceAll(' ', '');
                return nameConcat.includes(filterCondition) && user.id !== req.session.user.id;
            });
            res.status(200).send(filteredUsers);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).send('Filter String or User ID not provided');
    }
});

//Get all contacts of user
router.post('/contacts', requireAuthenticate, async (req, res) => {
    if (req.body.userId) {
        await getContacts(req, res);
    } else {
        res.status(400).send('User not provided');
    }
});

//Delete contact of user
router.post('/contacts/delete', requireAuthenticate, async (req, res) => {
    if (req.body.userId && req.body.contactId) {
        try {
            await UserFriend.destroy({ where: { userId: req.body.userId, friendId: req.body.contactId } });
            await getContacts(req, res);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).send('User ID or Contact ID not provided');
    }
});

//Create contact of user
router.post('/contacts/create', requireAuthenticate, async (req, res) => {
    if (req.body.userId && req.body.contactId) {
        try {
            await UserFriend.findOrCreate({ where: { userId: req.body.userId, friendId: req.body.contactId } });
            await getContacts(req, res);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).send('User ID or Contact ID not provided');
    }
});

module.exports = router;
