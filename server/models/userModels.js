import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for social logins
  name: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
  avatar: { type: String },
  provider: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password only if it exists and is modified
userSchema.pre('save', async function(next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;