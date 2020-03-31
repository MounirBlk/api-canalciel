const User = require('../models/user'),
    filter = require('../middleware/filter');

exports.login = (req, res) => {
    res.status(200).send('OK');
}

exports.register = (req, res) => {
    const data = Object.assign({ email: '', password: '', username: '' }, req.body)

    if (!filter.email(data.email) || data.password < 5 || data.username < 4)
        return res.status(400).json({
            error: true,
            message: 'Syntaxe request error'
        })

    new User({ email: data.email, password: data.password, username: data.username })
        .save().then(() => {
            console.log('User register');
            res.status(200).json({
                error: false,
                message: ''
            })
        }).catch((error) => {
            return res.status(409).json({
                error: true,
                message: 'Email/Username existe'
            })
        })
}

exports.forgot_password = (req, res) => {
    res.status(200).send('OK');
}