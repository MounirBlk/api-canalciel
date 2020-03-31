exports.login = (req, res) => {
    res.status(200).send('OK.');
}

exports.register = (req, res) => {
    const data = Object.assign({ email: '', password: '' }, req.body)
    res.status(200).send('OK.');
}

exports.forgot_password = (req, res) => {
    res.status(200).send('OK.');
}