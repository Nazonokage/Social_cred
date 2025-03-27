import express from 'express';
import { registerUser, loginUser } from './auth.js';
import { User, Debt } from './models/index.js';
import authMiddleware from './middleware/authMiddleware.js';
import { Buffer } from 'buffer';

const router = express.Router();

// Helper function for logging
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Health check
router.get("/", logRequest, (req, res) => {
  res.status(200).json({ message: "Social Credit Records" });
});

// Auth Routes
router.post("/auth/register", logRequest, async (req, res) => {
  try {
    await registerUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.address
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Registration error:', err);
    const status = err.message === 'Email already exists' ? 409 : 500;
    res.status(status).json({ error: err.message || 'Registration failed' });
  }
});

router.post("/auth/login", logRequest, async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json({
      message: "Login successful",
      token: user.token,
      userId: user.UID.toString()
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/auth/me", logRequest, authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { UID: req.userId },
      attributes: ['UID', 'name', 'email', 'credit_score', 'address']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Failed to fetch user:', err);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Debt Routes (without encryption)
router.post("/auth/debts", logRequest, authMiddleware, async (req, res) => {
  try {
    if (!req.body.data) {
      return res.status(400).json({ error: "Debt data is required" });
    }

    const newDebt = await Debt.create({
      UID: Buffer.from(req.userId, 'utf8'),
      Data: JSON.stringify(req.body.data) // Store as plain JSON string
    });

    res.status(201).json({
      DID: newDebt.DID,
      UID: { type: "Buffer", data: Array.from(newDebt.UID) },
      Data: req.body.data, // Return original data
      created_at: newDebt.created_at
    });

  } catch (err) {
    console.error('Failed to create debt:', err);
    res.status(500).json({ error: "Failed to create debt" });
  }
});

router.get("/auth/debts", logRequest, authMiddleware, async (req, res) => {
  try {
    const debts = await Debt.findAll({
      where: { UID: Buffer.from(req.userId, 'utf8') },
      order: [['created_at', 'DESC']]
    });

    const formattedDebts = debts.map(debt => {
      try {
        return {
          DID: debt.DID,
          UID: { type: "Buffer", data: Array.from(debt.UID) },
          Data: JSON.parse(debt.Data), // Parse stored JSON directly
          created_at: debt.created_at
        };
      } catch (err) {
        console.error(`Data parsing error for debt ${debt.DID}:`, err);
        return null;
      }
    }).filter(Boolean);

    res.status(200).json(formattedDebts);
  } catch (err) {
    console.error('Failed to fetch debts:', err);
    res.status(500).json({ error: "Failed to fetch debts" });
  }
});

router.put('/auth/debts/:debtId', logRequest, authMiddleware, async (req, res) => {
  try {
    const [updated] = await Debt.update(
      { Data: JSON.stringify(req.body.data) }, // Store as plain JSON string
      {
        where: {
          DID: req.params.debtId,
          UID: Buffer.from(req.userId, 'utf8')
        }
      }
    );
    
    if (updated === 0) return res.status(404).json({ error: "Debt not found" });
    res.status(200).json({ message: "Debt updated successfully" });
  } catch (err) {
    console.error('Debt update error:', err);
    res.status(500).json({ error: "Failed to update debt" });
  }
});

router.delete('/auth/debts/:debtId', logRequest, authMiddleware, async (req, res) => {
  try {
    const deleted = await Debt.destroy({
      where: {
        DID: req.params.debtId,
        UID: Buffer.from(req.userId, 'utf8')
      }
    });
    
    if (deleted === 0) return res.status(404).json({ error: "Debt not found" });
    res.status(200).json({ message: "Debt deleted successfully" });
  } catch (err) {
    console.error('Debt deletion error:', err);
    res.status(500).json({ error: "Failed to delete debt" });
  }
});

// Profile Routes
router.put('/auth/profile', logRequest, authMiddleware, async (req, res) => {
  try {
    const [updated] = await User.update(
      {
        name: req.body.name,
        address: req.body.address
      },
      { where: { UID: req.userId } }
    );
    
    if (updated === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Logout
router.post('/auth/logout', logRequest, authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

export default router;