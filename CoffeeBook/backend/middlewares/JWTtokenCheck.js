const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function refreshTokens(id, firstName, isAdmin, req, res, next) {
    if (req.cookies.refresh_token) {
        const user = await User.findOne({ where: { id } });
        if (user.token === req.cookies.refresh_token) {
            jwt.verify(req.cookies.refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                if (err) {
                    req.session.user = false;
                    next();
                } else {
                    const accessToken = jwt.sign({ id, firstName, isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                    const refreshToken = jwt.sign({ id, firstName, isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
                    await User.update({ token: refreshToken }, { where: { id } });
                    res.cookie('refresh_token', refreshToken, { httpOnly: true });
                    res.cookie('access_token', accessToken);
                    req.session.user = jwt.decode(accessToken);
                    next();
                }
            });
        } else {
            req.session.user = false;
            next();
        }
    } else {
        req.session.user = false;
        next();
    }
}

async function JWTtokenCheck(req, res, next) {
    req.session = {};
    if (!req.cookies.access_token) {
        req.session.user = false;
        next();
    } else {
        jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    const { id, firstName, isAdmin } = jwt.decode(req.cookies.access_token);
                    await refreshTokens(id, firstName, isAdmin, req, res, next);
                } else {
                    req.session.user = false;
                    next();
                }
            } else {
                req.session.user = user;
                next();
            }
        });
    }
}

module.exports = JWTtokenCheck;
