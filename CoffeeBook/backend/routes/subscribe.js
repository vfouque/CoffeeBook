const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const { email, password, firstName, lastName } = req.body;
        let [user, created] = await User.findOrCreate({ where: { email }, defaults: { password, firstName, lastName }, raw: true });
        if (created) {
            const { id, firstName, lastName, isAdmin, profilePicturePath } = user;
            const accessToken = jwt.sign({ id, firstName, isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ id, firstName, isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
            await User.update({ token: refreshToken }, { where: { id } });
            res.cookie('refresh_token', refreshToken, { httpOnly: true });
            res.cookie('access_token', accessToken).status(200).send({ user: { id, isAdmin, firstName, lastName, profilePicturePath } });
        } else {
            res.status(409).send('User is already exist');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
