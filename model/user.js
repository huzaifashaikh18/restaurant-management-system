// models/User.js
const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const crypto    = require('crypto');
const validator = require('validator');

const SALT_ROUNDS = 12;

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, 'Name is required'],
      trim:      true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true,
      validate:  [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
      type:      String,
      required:  [function() { return !this.googleId; }, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select:    false,
    },

    // Google OAuth fields
    googleId: {
      type:   String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type:    String,
      default: '',
    },

    // Used to invalidate JWTs issued before a password change.
    passwordChangedAt: {
      type:   Date,
      select: false,
    },
    role: {
      type:    String,
      enum:    {
        values:  ['customer', 'owner', 'admin'],
      },
      default: 'customer',
    },
    isActive: {
      type:    Boolean,
      default: true,
      index:   true,
    },
    loginAttempts: {
      type:    Number,
      default: 0,
      select:  false,
    },
    lockUntil: {
      type:   Date,
      select: false,
    },
    resetPasswordToken:  String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// ─── PRE-SAVE HOOKS ───────────────────────────────────────────────────────────

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

// Set passwordChangedAt when password is changed
userSchema.pre('save', function () {
  if (!this.isModified('password') || this.isNew) return;
  this.passwordChangedAt = Date.now() - 1000;
});

// ─── VIRTUALS ─────────────────────────────────────────────────────────────────
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// ─── INSTANCE METHODS ─────────────────────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.getResetPasswordToken = function () {
  const rawToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return rawToken;
};

userSchema.methods.incrementLoginAttempts = async function () {
  const LOCK_THRESHOLD = 5;
  const LOCK_DURATION  = 15 * 60 * 1000;

  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.model('User').updateOne(
      { _id: this._id },
      { $set: { loginAttempts: 1 }, $unset: { lockUntil: 1 } }
    );
  }

  const update = { $inc: { loginAttempts: 1 } };

  if (this.loginAttempts + 1 >= LOCK_THRESHOLD) {
    update.$set = { lockUntil: Date.now() + LOCK_DURATION };
  }

  return this.model('User').updateOne({ _id: this._id }, update);
};

module.exports = mongoose.model('User', userSchema);