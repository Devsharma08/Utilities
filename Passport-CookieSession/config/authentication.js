const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../config/database');

passport.use(new LocalStrategy(
  { usernameField: 'name' }, // use 'name' instead of default 'username'
  async function (name, password, done) {
    try {
      const user = await User.findOne({ name });
      if (!user) return done(null, false, { message: 'User not found' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Incorrect password' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => { //return user
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => { //return user on id base
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
