const User = require('../models/user');
const config = require('../config');
const jwt = require('jwt-simple');

const tokenForUser = (user) => {
    return jwt.encode({sub: user._id, iat: new Date().getTime()}, config.jwtSecret);
}

const signIn = (req, res, next) => {
    // passport saves the user in req in the middleware
    res.send({ token: tokenForUser(req.user)});
}

const signUp = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(422).send({ err: 'You must provide email and password'});
    }
    
        User.findOne({email}, (err, existingUser) => {
            if(err) {
                return next(err);
            }

            if(existingUser){
                return res.status(422).send({err: 'Email is in use'});
            }
        })

        const user = new User({
            email,
            password
        });

        user.save((err) => {
            if(err){
                return next(err);
            }

            res.status(201).json({ token: tokenForUser(user)});
        })
}

module.exports = {
    signUp,
    signIn
};