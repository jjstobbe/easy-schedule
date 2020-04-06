import passport from'koa-passport';
import GoogleStrategy from 'passport-google-oauth20';
import keys from './keys.js';
import User from '../models/user-model.js';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
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
      (accessToken, refreshToken, profile, done) => {
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
