const admin = require('../config/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // user.uid, email, dll
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyFirebaseToken;
