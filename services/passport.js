const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// localOptions
const localOptions = {
    usernameField: 'email'
}
// create a local strategy
const localLogin = new LocalStrategy( localOptions, function(email, password, done) {
    User.findOne({ email }, (err, user) => {
        if(err){
            return done(err);
        }

        if(!user){
            return done(null, false);
        }

        // compare the passwords
        user.comparePassword(password, (err, isMatch) => {
            if(err){
                return done(err);
            }

            if(!isMatch){
                return done(null, false);
            }

            return done(null, user);
        })

    })
})

// define Jwt options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwtSecret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // see if user Id got from payload is in database
    User.findById(payload.sub, (err, user) => {
        if(err) {
            return done(err, false);
        }

        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    })
})

// tell passport to use the strategy
passport.use(jwtLogin);
passport.use(localLogin);