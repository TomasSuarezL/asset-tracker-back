
const Buys = require('../models').Buys;

module.exports.add = (req, res) => {
    return Buys
      .create(req.body)
      .then((classroom) => res.status(201).send(classroom))
      .catch((error) => res.status(400).send(error));
  }
