const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const userdb = require('../model/usermodel')

passport.use('user-rule',new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    let user = await userdb.findOne({ email: email });

    if (!user || user.password != password) {
        console.log('email and password not match');
        return done(null, false);
    }
    return done(null, user);
}));

passport.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login");
};

passport.setAuth = (req, res, next) => {
    res.locals.user = req.user;
    return next();
}

module.exports = passport;