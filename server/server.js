import Koa from 'koa';
import reactrouter from 'koa-react-router';
import App from '../src/App.js';
import Container from '../src/Container.js';
import bodyParser from 'koa-bodyparser';
import authRoutes from './routes/auth-routes.js';
import scheduleRoutes from './routes/schedule-routes.js';
import passport from 'koa-passport';
import session from 'koa-session';
import keys from './config/keys.js';
import setupMongoose from './config/mongoose-setup.js';
import setupPassport from './config/passport-setup.js';

const app = new Koa();

// Setup Scripts
setupMongoose();
setupPassport();

// sessions
app.keys = [keys.session.cookieKey];
app.use(session(app));

// app.use(session(app));
app.use(bodyParser());

app.use(reactrouter({
    App,
    onError: (ctx, err) => console.log('I Have failed!!!!'),
    onRedirect: (ctx, redirect) => console.log('I have redirected!'),
    onRender: (ctx) => ({ Container })
}));

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
