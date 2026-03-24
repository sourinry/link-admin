import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach data in req.user
    req.user = {
      id: decoded.id
    };

    next();
  } catch (error) {
    console.error("Auth Error:", error);

    return res.status(401).json({
      status: false,
      message: "Unauthorized: Invalid token",
    });
  }
};
