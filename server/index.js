import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import authRoutes from './routes/auth-routes.js';
import scheduleRoutes from './routes/schedule-routes.js';
import passport from 'koa-passport';
import session from 'koa-session';
import keys from './config/keys.js';
import mount from 'koa-mount';
import path from 'path';
import setupMongoose from './config/mongoose-setup.js';
import setupPassport from './config/passport-setup.js';

const app = new Koa();
const static_pages = new Koa();

// Setup Scripts
setupMongoose();
setupPassport();

// sessions
app.keys = [keys.session.cookieKey];
app.use(session(app));

// app.use(session(app));
app.use(bodyParser());
static_pages.use(serve(path.resolve() + '\\build')); //serve the build directory
app.use(mount("/", static_pages));

// authentication
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());
app.use(scheduleRoutes.routes());
app.use(scheduleRoutes.allowedMethods());


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/', PORT, PORT);
});
