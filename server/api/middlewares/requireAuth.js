const jwt = require("jsonwebtoken");

const SECRET_KEY = "some key"; // process.env.SECRET_KEY

module.exports = function (req, res, next) {
  // verify header bearer token
  try {
    if (req.headers) {
      const { authorization } = req.headers;
      if (!authorization) {
        // exist authorization in header
        res.status(200).json({
          success: false,
          message: `token not found`,
        });
        return;
      }
      const token = authorization.replace("Bearer ", "");
      if (!token) {
        res.status(200).json({
          success: false,
          message: `token not found in header`,
        });
      } else {
        jwt.verify(token, SECRET_KEY, async function (err, payload) {
          // jwt verify token
          if (err) {
            res.status(200).json({
              success: false,
              message: `token not valid`,
            });
          } else {
            const { email } = payload;
            // //console.log(`email ${email} authorization access`);
            // db.get(`SELECT * FROM user WHERE email  = ?`, [email], (err, row) => {  // user email exist in the database table user
            //     if (err) {
            //         res.status(200).json({
            //             success: false,
            //             message: `token failed user not found`
            //         });
            //     } else if (row) {
            //         req.email = email;
            //         next();
            //     } else {
            //         res.status(200).json({
            //             success: false,
            //             message: `token failed user not found`
            //         });
            //     }
            // });
            req.email = email;
            req.token = token;
            next();
          }
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: `token failed`,
      });
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      message: `token failed`,
    });
  }
};
