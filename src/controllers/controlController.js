const { Control } = require('../models');

let controlStateCache = { manual: false, state: 0 };

exports.getControlState = async (req, res) => {
  try {
    const control = await Control.findOne({ order: [['updatedAt', 'DESC']] });
    if (control) {
      controlStateCache = { manual: control.manual, state: control.state };
    }
    res.json(controlStateCache);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get control state' });
  }
};

exports.postControlState = async (req, res) => {
  const { manual, state } = req.body;
  if (typeof manual !== 'boolean' || ![0, 1].includes(state)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    await Control.create({ manual, state });
    controlStateCache = { manual, state };
    res.status(200).json({ message: 'Control updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update control' });
  }
};
