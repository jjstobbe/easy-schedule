import Router from 'koa-router';
import passport from 'koa-passport';
const router = new Router();

// auth logout
router.get('/auth/logout', (ctx) => {
    ctx.logout();
    ctx.redirect('/');
});

// auth with google+
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/calendar'],
    accessType: 'offline',
    prompt: 'consent'
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/auth/google/redirect', passport.authenticate('google'), (ctx) => {
    // If calendars don't exist, go to calendar. If they do, then just go to schedule
    ctx.redirect('/calendar')
});

export default router;
