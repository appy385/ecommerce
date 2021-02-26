const service = require('../services/ecom.service');

const createEcomHandler = async (req, res) => {
  try {
    const { query } = req;
    const response = await service.createEcom(JSON.parse(query.name));
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send();
  }
};

const getDistinctFeaturesHandler = async (req, res) => {
  try {
    const { query } = req;
    const response = await service.getDistinctFeatures(JSON.parse(query.name));
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = { createEcomHandler, getDistinctFeaturesHandler };
