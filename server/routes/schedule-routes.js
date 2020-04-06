import Router from 'koa-router';
import google from 'googleapis';
import keys from '../config/keys.js';
const router = new Router();

const authCheck = (ctx, next) => {
    if(!ctx.state.user){
        ctx.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/get-calendars', authCheck, async (ctx) => {
    const oauth2Client = new google.auth.OAuth2(
        keys.google.clientID,
        keys.google.clientSecret,
        '/auth/login'
    );

    oauth2Client.setCredentials({
        refresh_token: ctx.state.user.refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const res = await calendar.calendarList.list({
        maxResults: 10,
    });

    return res.data.items;
});

router.get('/set-primary-calendar', authCheck, async (ctx) => {
    // Update user in mongo..

    console.log({ res1: ctx });
});

router.get('/schedule', authCheck, async (ctx) => {
    if (!ctx.state.user.primaryCalendarId) {
        ctx.redirect('/set-primary-calendar');
        return;
    }
    
    const oauth2Client = new google.auth.OAuth2(
        keys.google.clientID,
        keys.google.clientSecret,
        '/auth/login'
    );

    oauth2Client.setCredentials({
        refresh_token: ctx.state.user.refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const res = await calendar.events.list({
      calendarId: ctx.state.user.primaryCalendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log({ res2: res });
});

export default router;
