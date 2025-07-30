const passport = require('passport');
const UserJwt = require('../modal/UserModel');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret', // should ideally come from process.env
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await UserJwt.findById(jwt_payload.id); 
    
    if (user) {
      return done(null, user);
    } else {
      return done(null, false); 
    }
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;
