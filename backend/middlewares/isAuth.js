import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token; // ✅ cookie se token lo
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded payload (id, email etc.)
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
