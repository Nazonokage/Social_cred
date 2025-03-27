import jwt from 'jsonwebtoken';

const JWT_SECRET = "supersecurejwt";

export default (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(401).json({ error: 'Invalid token' });
  }
};