const admin = require("firebase-admin");
let db = admin.firestore();

module.exports.addLevCoins = async function (req, res) {
  try {
    const { coins, lastCoins } = req.body || {};
    const email = req.email;
    console.log({ email, coins, lastCoins });
    const data = await db.collection("transaction").doc(email).get();
    const transactions = data && data.data && data.data();
    await db.collection("user").doc(email).update({
      coins: lastCoins + coins,
    });
    if (transactions) {
      await db.collection("transaction").doc(email).update({
        [new Date()]: {
          coins,
          lastCoins,
          createdDate: new Date(),
          email,
        }
      });
    } else {
      await db.collection("transaction").doc(email).set({
        [new Date()]: {
          coins,
          createdDate: new Date(),
          email,
        }
      });
    }
    
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
    const data = await db.collection("transaction").doc(email).get();
    const user = data && data.data && data.data();
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `no transaction found`,
        email
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
