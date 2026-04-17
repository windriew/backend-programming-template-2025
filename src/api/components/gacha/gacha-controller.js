const gachaService = require('./gacha-service');

module.exports = {
  gacha: async (req, res) => {
    try {
      const result = await gachaService.gacha(req.body.userId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  history: async (req, res) => {
    const data = await gachaService.history(req.params.userId);
    res.json(data);
  },
};
