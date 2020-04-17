import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import authRoutes from './routes/auth-routes.js';
import scheduleRoutes from './routes/schedule-routes.js';
import serve from 'koa-static';
import mount from 'koa-mount';
import passport from 'koa-passport';
import session from 'koa-session';
import keys from './config/keys.js';
import setupMongoose from './config/mongoose-setup.js';
import setupPassport from './config/passport-setup.js';
import path from 'path';

const app = new Koa();

// Setup Scripts
setupMongoose();
setupPassport();

// sessions
app.keys = [keys.session.cookieKey];
app.use(session(app));

app.use(bodyParser());

app.use(mount('/', serve(path.join(path.resolve() + '/build'))));
app.use(mount('/login', serve(path.join(path.resolve() + '/build'))));
app.use(mount('/schedule', serve(path.join(path.resolve() + '/build'))));
app.use(mount('/calendar', serve(path.join(path.resolve() + '/build'))));

// authentication
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());
app.use(scheduleRoutes.routes());
app.use(scheduleRoutes.allowedMethods());


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/', PORT, PORT);
});
