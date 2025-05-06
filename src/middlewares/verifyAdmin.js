const { db } = require('../config/db');

exports.verifyAdmin = async (req, res, next) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();

    if (!userDoc.exists || userData.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.user.role = userData.role;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking admin role", error: error.message });
  }
};
