import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config({ quiet: true });

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 
        $or: [
          { googleId: profile.id },
          { email: profile.emails[0].value }
        ]
      });
      
      if (user) {
        // Update existing user with googleId if not present
        if (!user.googleId) {
          user.googleId = profile.id;
          user.name = user.name || profile.displayName;
          user.avatar = user.avatar || profile.photos[0]?.value;
          await user.save();
        }
      } else {
        // Create new user
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
          provider: 'google'
        });
        await user.save();
      }
      
      const token = generateToken(user);
      return done(null, { user, token });
    } catch (error) {
      return done(error, null);
    }
  }
));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 
        $or: [
          { facebookId: profile.id },
          { email: profile.emails[0]?.value }
        ]
      });
      
      if (user) {
        if (!user.facebookId) {
          user.facebookId = profile.id;
          user.name = user.name || profile.displayName;
          user.avatar = user.avatar || profile.photos[0]?.value;
          await user.save();
        }
      } else if (profile.emails && profile.emails[0]) {
        user = new User({
          facebookId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
          provider: 'facebook'
        });
        await user.save();
      }
      
      const token = generateToken(user);
      return done(null, { user, token });
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data);
});

export default passport;