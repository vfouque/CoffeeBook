const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
    // Authenticate user
    try {
        const { email, password } = req.body;
        //Find user by email only
        let user = await User.findOne({ where: { email }, raw: true });
        if (user) {
            // Check if user authenticated
            if (await bcrypt.compare(password, user.password)) {
                const { id, firstName, lastName, isAdmin, profilePicturePath } = user;
                const accessToken = jwt.sign({ id, firstName, isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                const refreshToken = jwt.sign({ id, firstName, isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
                await User.update({ token: refreshToken }, { where: { id } });
                res.cookie('refresh_token', refreshToken, { httpOnly: true });
                res.cookie('access_token', accessToken).status(200).send({ user: { id, isAdmin, firstName, lastName, profilePicturePath } });
            } else {
                res.status(401).send('Wrong password');
            }
        } else {
            res.status(404).send('Cannot find user');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
