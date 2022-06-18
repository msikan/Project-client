var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
let db = admin.firestore();

const SECRET_KEY = "some key"; // process.env.SECRET_KEY

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports.signup = function (req, res) {
  try {
    const { password, email, userName } = req.body || {};

    if (!email || !validateEmail(email)) {
      res.status(200).json({
        success: false,
        message: `Error was found email input not correct`,
      });
    } else {
      bcrypt.hash(password, 10, function (err, hash) {
        // hash the password
        if (err) {
          res.status(200).json({
            success: false,
            message: `Error was found input not correct`,
          });
        }
        const user = {
          email,
          password: hash,
          userName
        };
        db.collection("user").doc(email).set(user);
        const token = jwt.sign({ email }, SECRET_KEY, {
          expiresIn: "2h",
        });
        res.status(200).json({
          success: true,
          token,
        });
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Error was found`,
      error,
    });
  }
};

module.exports.signin = async function (req, res) {
  try {
    const { password, email } = req.body || {};
    if (!email || !validateEmail(email)) {
      res.status(200).json({
        success: false,
        message: `Error was found email input not correct`,
      });
    } else {
      const data = await db.collection("user").doc(email).get();
      const user = data && data.data && data.data();
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          // compare hashed password from db with the password
          if (result) {
            // Passwords match
            const token = jwt.sign({ email }, SECRET_KEY, {
              expiresIn: "2h",
            });
            res.status(200).json({
              success: true,
              token,
            });
          } else {
            // Passwords don't match
            res.status(200).json({
              success: false,
              message: `Error password incorrect`,
            });
          }
        });
      } else {
        res.status(200).json({
          success: false,
          message: `Error incorrect`,
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Error was found`,
      error,
    });
  }
};

module.exports.getUserInfo = async function (req, res) {
  try {
    const email = req.email;
    const data = await db.collection("user").doc(email).get();
    const user = data && data.data && data.data();
    if (user) {
      res.status(200).json({
        success: true,
        data: {...user },
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Error was found`,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Error was found`,
      error,
    });
  }
};
