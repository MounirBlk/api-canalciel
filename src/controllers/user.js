const config = require('../config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    filter = require('../middleware/filter');

exports.login = async(req, res) => {
    const data = Object.assign({ identifiant: '', password: '' }, req.body)

    const where = (!filter.email(data.identifiant)) ? { username: data.identifiant } : { email: data.identifiant }
    const user = await User.findOne(where);

    if (user === null)
        return res.status(409).json({
            error: true,
            message: 'Email/Password error'
        })

    const valid = user.verifyPasswordSync(data.password);
    if (valid) {
        return res.status(200).json({
            error: false,
            token: jwt.sign({
                id: user.get('_id'),
                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24 * 7,
            }, config.keyToken)
        })
    } else {
        return res.status(409).json({
            error: true,
            message: 'Email/Password error'
        })

    }
}

exports.register = (req, res) => {
    const data = Object.assign({ email: '', password: '', username: '' }, req.body)

    if (!filter.email(data.email) || data.password < 5 || data.username < 4)
        return res.status(400).json({
            error: true,
            message: 'Syntaxe request error'
        })

    new User({ email: data.email, password: data.password, username: data.username })
        .save().then((user) => {
            console.log('User register');
            return res.status(200).json({
                error: false,
                token: jwt.sign({
                    id: user.get('_id'),
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24 * 7,
                }, config.keyToken)
            })
        }).catch((error) => {
            return res.status(409).json({
                error: true,
                message: 'Email/Username existe'
            })
        })
}

exports.forgot_password = (req, res) => {
    var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM0Njg3ZWUwN2RjMzU1ZGUxNDQxZCIsImV4cCI6MTU4NjI2NjM3NSwiaWF0IjoxNTg1NjYxNTc1fQ.sSqrgr3CZo837erHwQ6VDnlh_BzY1aMGT9g5lvs4s30', config.keyToken);
    console.log(decoded) // bar
    res.status(200).send('OK');
}