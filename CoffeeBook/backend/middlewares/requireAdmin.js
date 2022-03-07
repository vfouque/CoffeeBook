async function requireAdmin(req, res, next) {
    if (req.session.user.isAdmin) {
        next();
    } else {
        res.status(401).send('Not allowed. Login like Admin, please');
    }
}

module.exports = requireAdmin;
