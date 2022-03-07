const express = require('express');
const { User } = require('../models')
const router = express.Router();

router.post('/', async (req, res) => {
    res.clearCookie('refresh_token')
    await User.update({ token: null }, { where: { id: req.session.user.id } });
    res.clearCookie('access_token').status(200).send('You was successfully logout');
});

module.exports = router;
