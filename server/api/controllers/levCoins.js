const admin = require("firebase-admin");
let db = admin.firestore();

module.exports.addLevCoins = async function (req, res) {
  try {
    const { coins } = req.body || {};
    const email = req.email;
    console.log({ email });
    await db.collection("user").doc(email).update({
      coins,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: `Error was found`,
      error,
    });
  }
};

module.exports.getLevCoins = async function (req, res) {
  try {
    const email = req.email;
    const data = await db.collection("user").doc(email).get();
    const user = data && data.data && data.data();
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
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
