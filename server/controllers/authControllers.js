import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Email/Password Register
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Create new user
    const user = new User({ 
      email, 
      password,
      name: name || email.split('@')[0],
      role: 'user',
      provider: 'local'
    });
    await user.save();
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true, 
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error registering user:", error);
  }
};

// Email/Password Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true, 
      token,
      user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify token
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Social Login Success Handler
export const socialLoginSuccess = (req, res) => {
  if (req.user) {
    // Redirect to frontend with token
    const token = req.user.token;
    const user = req.user.user;
    res.redirect(`${process.env.FRONTEND_URL}/auth/social-callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  } else {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// Social Login Failure Handler
export const socialLoginFailure = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/login?error=social_auth_failed`);
};