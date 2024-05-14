//make route for middleware
const middleware = require('../middlewares/middleware');

router.get('/userdashboard', middleware.requireLogin, (req, res) => {
    res.render('userdashboard');
});

