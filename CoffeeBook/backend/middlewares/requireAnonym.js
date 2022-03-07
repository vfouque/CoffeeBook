async function requireAnonym(req, res, next) {
    if (!req.session.user) {
        next();
    } else {
        res.status(401).send('You are already login');
    }
}

module.exports = requireAnonym;
