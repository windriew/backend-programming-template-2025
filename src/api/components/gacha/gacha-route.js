const controller = require('./gacha-controller');

module.exports = (app) => {
  app.post('/gacha', controller.gacha);
  app.get('/gacha/history/:userId', controller.history);
  app.get('/gacha/prizes', controller.prizes);
  app.get('/gacha/winners', controller.winners);
};
