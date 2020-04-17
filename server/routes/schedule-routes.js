import Router from 'koa-router';
import googleapis from 'googleapis';
import keys from '../config/keys.js';
const google = googleapis.google;
const router = new Router();

const authCheck = async (ctx, next) => {
    if(!ctx.state.user){
        ctx.status = 403;
        return;
    } else {
        return next();
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

    const calendars = res.data.items;
    
    // Don't want users selecting public calendars. They must own the calendar.
    const ownedCalendars = calendars.filter(c => c.accessRole === 'owner');

    ctx.body = {
        items: ownedCalendars
    };
});

router.post('/set-primary-calendar', authCheck, async (ctx) => {
    if (!ctx.request.query.selectedCalendarId) {
        ctx.throw(400, 'Query parameter "selectedCalendarId" was not provided.');
    }

    console.log("TODO: Update user's selectedCalendarId to ", ctx.request.query.selectedCalendarId);
});

router.get('/schedule', authCheck, async (ctx) => {
    if (!ctx.state.user.primaryCalendarId) {
        ctx.redirect('/set-primary-calendar');
        return;
    }
    
    const oauth2Client = new google.auth.OAuth2(
        keys.google.clientID,
        keys.google.clientSecret,
        '/login'
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
