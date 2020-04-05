const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router();

// auth logout
router.get('/auth/logout', (req, res) => {
    // handle with passport
    console.log('logging out');
});

// auth with google+
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('you reached the redirect URI', JSON.stringify(req));
});

module.exports = router;
