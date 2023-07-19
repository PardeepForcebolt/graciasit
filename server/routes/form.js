const { Router } = require("express");
const { AUTH_VALIDATOR } = require("../constant");
const NodeCache = require("node-cache");
const router = Router();
const myDB = new NodeCache();

//@ROUTE = /form/save
//@TYPE = POST
//@ACCESS = PUBLIC
//@DESCRIPTION = Save Admin Form

router.post("/save", AUTH_VALIDATOR, (req, res) => {
  try {
    const body = req.body;
    const user = req.user;

    if (!body || body?.length <= 0) {
      return res.status(400).json({
        error: false,
        message: "Please pass valid payload.",
        status: "INVALID_PAYLOAD",
      });
    }

    if (!user || user?.role !== "admin") {
      return res.status(400).json({
        error: false,
        message: "You don't have access to perform this action.",
        status: "ACCESS_DENIED",
      });
    }

    myDB.set("saved_form", JSON.stringify(body));

    res.json({
      error: false,
      message: "Form Saved Successfully.",
      status: "OK",
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

router.get("/get", AUTH_VALIDATOR, (req, res) => {
  try {
    let form = myDB.get("saved_form");
    if (form) {
      form = JSON.parse(form);
    }
    res.json({ error: false, status: "OK", form: form || [] });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Something Went Wrong.",
      status: "SERVER_ERROR",
    });
  }
});

module.exports = router;
