async function requireAuthenticate(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Please login first');
    }
}

module.exports = requireAuthenticate;
