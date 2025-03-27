import { User } from './models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "supersecurejwt";
const TOKEN_EXPIRY = "1h";
const SALT_ROUNDS = 10;

export async function registerUser(name, email, password, address) {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    console.log('[REGISTER] Hashing password for:', email);
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('[REGISTER] Generated hash:', hash);

    const user = await User.create({
      UID: generateUUID(),
      name,
      email: email.toLowerCase().trim(),
      password: hash,
      address
    });

    console.log('[REGISTER] User created:', user.email);
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;

  } catch (err) {
    console.error('[REGISTER] Error:', {
      message: err.message,
      stack: err.stack,
      raw: err
    });
    throw err;
  }
}

export async function loginUser(email, password) {
  try {
    console.log('[LOGIN] Attempt for:', email);
    
    const user = await User.findOne({ 
      where: { email: email.toLowerCase().trim() },
      attributes: ['UID', 'name', 'email', 'password', 'address'],
      raw: true // Add this to get plain JSON object
    });

    if (!user) {
      console.warn('[LOGIN] User not found:', email);
      return null;
    }

    console.log('[LOGIN] Found user:', user.email);
    // Ensure both arguments are strings
    const match = await bcrypt.compare(password.toString(), user.password.toString());
    console.log('[LOGIN] Password match:', match);

    if (!match) {
      console.warn('[LOGIN] Invalid password for:', user.email);
      return null;
    }

    // Inside loginUser function
    const token = jwt.sign(
      { userId: user.UID.toString(), // Ensure UID is a string
        email: user.email 
      }, 
      JWT_SECRET, 
      { expiresIn: TOKEN_EXPIRY }
    );

    console.log('[LOGIN] Generated token for:', user.UID);
    const { password: _, ...userData } = user;
    return { ...userData, token };

  } catch (err) {
    console.error('[LOGIN] Verification error:', {
      message: err.message,
      stack: err.stack,
      rawInputs: { email, password },
      storedHash: User?.password
    });
    throw new Error('Login failed');
  }
}

// generateUUID remains the same

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}