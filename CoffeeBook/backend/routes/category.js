const express = require('express');
const router = express.Router();
const { Category, UserCategory } = require('../models/index');
const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdmin = require('../middlewares/requireAdmin');

// Get all categories ordered by ascending name order
router.post('/', requireAuthenticate, async (req, res) => {
    const categories = await Category.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
        raw: true,
    });
    res.status(200).send(categories);
});

// Create a new category by an Admin
router.post('/new', requireAdmin, async (req, res) => {
    const { categoryName } = req.body;

    const [newCategory, created] = await Category.findOrCreate({ where: { name: categoryName }, raw: true });

    if (!created) {
        console.log(`Not Created. The category "${newCategory.name}" is already exists.`);
    }
    res.send(
        await Category.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
            raw: true,
        })
    );
});

router.post('/filter', requireAuthenticate, async (req, res) => {
    const { userId, keyword } = req.body;
    if (userId && keyword) {
        const filter = keyword.toString().toLowerCase().replaceAll(' ', '');
        const allCategories = await Category.findAll({ raw: true });
        const kFiltered = allCategories.filter((cat) => {
            let smallCat = cat.name.toLowerCase().replaceAll(' ', '');
            return smallCat.includes(filter);
        });
        const userCategories = await UserCategory.findAll({
            where: { userId },
            attributes: ['categoryId'],
            raw: true,
        });
        const catIds = userCategories.map((cat) => cat.categoryId);
        const filtered = userCategories.length ? kFiltered.filter((cat) => !catIds.includes(cat.id)) : kFiltered;
        res.send(filtered);
    } else [res.status(404).send('Missing user id or keyword')];
});

module.exports = router;
