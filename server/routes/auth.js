const { Router } = require("express");
const { USERS } = require("../constant/users");
const { sign } = require("jsonwebtoken");
const { AUTH_VALIDATOR } = require("../constant");
const router = Router();

//@ROUTE = /auth/login
//@TYPE = POST
//@ACCESS = PUBLIC
//@DESCRIPTION = Users Login
//@PAYLOAD = [email,password]

router.post("/login", (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: "Invalid Email Address",
        status: "INVALID_EMAIL",
      });
    }

    if (!password) {
      return res.status(400).json({
        error: true,
        message: "Invalid Password.",
        status: "INVALID_PASSWORD",
      });
    }

    const user = USERS.find(
      (user) => user.email === email?.toLowerCase()?.trim()
    );

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User not found.",
        status: "NOT_FOUND",
      });
    }

    if (user?.password !== password) {
      return res.status(400).json({
        error: true,
        message: "Invalid user password.",
        status: "INVALID_PASSWORD",
      });
    }

    const access_token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.json({
      error: false,
      status: "OK",
      access_token,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Something Went Wrong.",
      status: "SERVER_ERROR",
    });
  }
});

//@ROUTE = /auth/userinfo
//@TYPE = GET
//@ACCESS = PRIVATE
//@DESCRIPTION = Users Profile
//@PAYLOAD = [auth token]

router.get("/userinfo", AUTH_VALIDATOR, (req, res) => {
  try {
    const userinfo = req.user;
    res.json({
      error: false,
      status: "OK",
      userinfo,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Something Went Wrong.",
      status: "SERVER_ERROR",
    });
  }
});

module.exports = router;
