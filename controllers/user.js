const User = require('../models/user')


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'User Not Found.' })
        }
        req.profile = user;
        next();
    });
}
exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err,user) => {
        if (err || !user) { return res.status(400).json({ err: 'User not found ' }) }
        else {
            return res.status(200).json({ Success: 'User deleted.' })
        }
    })

}

// User.deleteOne(id).exec((err, user) => {
//     if (err) { return res.status(400).json({ err: 'User not found ' }) }
//     // else return res.status(200).json({ Success: 'User deleted.' })
//     req.profile = user;
//     next();
// });
