const jwt = require("jsonwebtoken"); // <<< install this npm package



module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const secret = process.env.JWT_SECRET

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};

