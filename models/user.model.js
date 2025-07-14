import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isTempPassword: {
    type: Boolean,
    default: false,
  },
  tempPasswordExpiry: {
    type: Date,
  },
  requiresPasswordReset: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', UserSchema);
