const { verify } = require("jsonwebtoken");

const AUTH_VALIDATOR = (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        error: true,
        message: "Un Authorized Access",
        status: "UN_AUTHORIZED_ACCESS",
      });
    }
    const user = verify(authorization, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Token Expire",
      status: "INVALID_TOKEN",
    });
  }
};

module.exports = {
  AUTH_VALIDATOR,
};
