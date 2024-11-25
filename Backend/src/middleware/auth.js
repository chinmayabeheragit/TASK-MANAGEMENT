const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).send("Please provide a valid Bearer token...");
    }
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);

    if (!decoded.email) {
      throw new Error("Invalid token payload: email is missing");
    }
    req.Name = decoded.email;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = auth;
