const authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{ session: false });
const requireSignIn = passport.authenticate('local',{ session: false });

module.exports = function(app){
    app.get('/', requireAuth, (req, res) => {
        res.send({
            Hi: 'there!!'
        })
    })
    app.post('/signin', requireSignIn, authentication.signIn);
    app.post('/signup', authentication.signUp);  
}