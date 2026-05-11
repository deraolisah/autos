import express from 'express';
import passport from '../config/passport.js';
import { 
  register, 
  login, 
  verifyToken,
  socialLoginSuccess,
  socialLoginFailure
} from '../controllers/authControllers.js';

const router = express.Router();

// Email/Password routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/auth/google/failure',
    session: false 
  }),
  socialLoginSuccess
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/api/auth/facebook/failure',
    session: false 
  }),
  socialLoginSuccess
);

router.get('/google/failure', socialLoginFailure);
router.get('/facebook/failure', socialLoginFailure);

export default router;