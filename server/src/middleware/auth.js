const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      status: "FAILED",
      message: "Authentication token missing",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.jwtPrivateKey);
    next();
  } catch (error) {
    return res.status(401).json({
      status: "FAILED",
      message: "Invalid or expired token",
    });
  }
};

module.exports = requireAuth;
