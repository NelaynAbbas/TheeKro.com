const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/users.models');
const bcrypt = require('bcrypt');
const { sendMail } = require('../mail/mail');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async (email, password, done) => {
        const user = await UserModel
            .findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Password incorrect' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user= await UserModel.findById(id);
    done(null, user);
}
);

module.exports = passport;

