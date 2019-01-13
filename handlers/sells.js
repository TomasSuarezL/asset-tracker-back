const { buys, sells } = require("../models");

module.exports.add = async (req, res, next) => {
  try {
    const newSell = req.body;

    const sell = await sells.create({ ...newSell, sell_date: new Date() });
    return res.send(sell);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};
