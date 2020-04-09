import passport from'koa-passport';
import GoogleStrategy from 'passport-google-oauth20';
import keys from './keys.js';
import User from '../models/user-model.js';

export default () => {
  passport.serializeUser(async (user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User: ", id);

    User.findById(id, (err, user) => {
        done(null, user);
    });
  });
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
      },
      (_, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              googleId: profile.id,
              refreshToken: refreshToken
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      }
    )
  );
}
