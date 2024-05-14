const express = require('express');
const router = express.Router();
const collection = require("../config/config");
const bcrypt = require('bcrypt');
const passport = require('passport');
const UserModel = require("../models/users.models");
const { Schema } = require('mongoose');
const { sendMail } = require('../mail/mail');
const middleware = require('../middlewares/middleware');

router.get('/', (req, res) => {
    res.render('index');
}
);

router.get('/signin', (req, res) => {
    res.render('signin');
}
);

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/userdashboard',
    failureRedirect: '/usernotfound'
})
);

router.get('/signup', (req, res) => {
    res.render('signup');
}
);

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new UserModel({
        email,
        password: hash
    });
    await user.save();
    res.redirect('/signin');
}
);

router.get('/forgotpassword', (req, res) => {
    res.render('forget');
}
);

router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel
        .findOne({ email });
    if (user) {
        const token = Math.random().toString(36).substr(2);
        user.resetToken = token;
        await user.save();
        sendMail(email, 'Password Reset', `Click <a href="http://localhost:3000/resetpassword/${token}">here</a> to reset your password`);
        res.send('Mail sent successfully');
    }
    else {
        res.redirect('/usernotfound');
    }
}
);

router.get('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;
    const user = await UserModel
        .findOne({ resetToken: token });
    if (user) {
        res.render('reset', { token });
    }
    else {
        res.redirect('/usernotfound');
    }
}
);

router.post('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await UserModel
        .findOne({ resetToken: token });
    if (user) {
        user.password = await bcrypt.hash(password, 10);
        user.resetToken = null;
        await user.save();
        res.redirect('/signin');
    }
    else {
        res.redirect('/usernotfound');
    }
}
);

router.get('/usernotfound', (req, res) => {
    res.render('usernotfound');
}
);

router.get('/userdashboard', middleware.requireLogin, (req, res) => {
    res.render('userdashboard');
}
);

module.exports = router;

