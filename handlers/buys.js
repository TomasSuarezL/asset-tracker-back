const _ = require("lodash/string");

const { buys, buy_types, currency, buy_state, asset_types, sells } = require("../models");

const TYPE_DEFAULT_SWING = 2;
const CURRENCY_DEFAULT_ARS = 1;
const STATE_DEFAULT_OPEN = 1;
const ASSET_DEFAULT_STOCK = 1;

module.exports.add = async (req, res, next) => {
  try {
    // search for attributes
    const type = await buy_types.findOne({ where: { description: _.capitalize(req.body.type) } });
    const type_id = type ? type.id : TYPE_DEFAULT_SWING;

    const currencyObj = await currency.findOne({ where: { description: _.upperCase(req.body.currency) } });
    const currency_id = currencyObj ? currencyObj.id : CURRENCY_DEFAULT_ARS;

    const state = await buy_state.findOne({ where: { description: _.capitalize(req.body.state) } });
    const state_id = state ? state.id : STATE_DEFAULT_OPEN;

    const asset_type = await asset_types.findOne({ where: { description: _.capitalize(req.body.asset) } });
    const asset_id = asset_type ? asset_type.id : ASSET_DEFAULT_STOCK;

    const newBuy = { ...req.body, ticker: _.upperCase(req.body.ticker), type_id, currency_id, state_id, asset_id };
    const buy = await buys.create(newBuy);

    return res.send(buy);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const buysAll = await buys.findAll({
      include: [
        { model: buy_state, as: "state", attributes: ["description"] },
        { model: asset_types, as: "asset", attributes: ["description"] },
        { model: currency, as: "currency", attributes: ["description"] },
        { model: buy_types, as: "type", attributes: ["description"] }
      ]
    });
    return res.send(buysAll);
  } catch (error) {
    return next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const buyId = req.params.id;
    const buyFound = await buys.findByPk(buyId, {
      include: [
        { model: buy_state, as: "state", attributes: ["description"] },
        { model: asset_types, as: "asset", attributes: ["description"] },
        { model: currency, as: "currency", attributes: ["description"] },
        { model: buy_types, as: "type", attributes: ["description"] }
      ]
    });

    const buyUpdate = req.body;

    const state_id = await buy_state.findOne({ where: { description: _.capitalize(req.body.state || buyFound.state.description) } });
    const currency_id = await currency.findOne({ where: { description: _.upperCase(req.body.currency || buyFound.currency.description) } });
    const asset_id = await asset_types.findOne({ where: { description: _.capitalize(req.body.asset || buyFound.asset.description) } });
    const type_id = await buy_types.findOne({ where: { description: _.capitalize(req.body.type || buyFound.type.description) } });

    buyUpdate.state = state_id;
    buyUpdate.state_id = state_id.id;
    buyUpdate.currency = currency_id;
    buyUpdate.currency_id = currency_id.id;
    buyUpdate.asset = asset_id;
    buyUpdate.asset_id = asset_id.id;
    buyUpdate.type = type_id;
    buyUpdate.type_id = type_id.id;

    const newBuy = await buyFound.update(buyUpdate);
    return res.send(newBuy);
  } catch (error) {
    console.log(error.message, error.name);
    if (error.name === "TypeError") return next({ status: 400, message: error.message, error });
    return next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const buyId = req.params.id;
    const rows = await buys.destroy({ where: { id: buyId } });
    return res.send({ rows });
  } catch (error) {
    return next(error);
  }
};

module.exports.getOne = async (req, res, next) => {
  try {
    return res.send(
      await buys.findByPk(req.params.id, {
        include: [
          { model: buy_state, as: "state", attributes: ["description"] },
          { model: asset_types, as: "asset", attributes: ["description"] },
          { model: currency, as: "currency", attributes: ["description"] },
          { model: buy_types, as: "type", attributes: ["description"] },
          { model: sells, as: "sells" }
        ]
      })
    );
  } catch (error) {
    return next(error);
  }
};
