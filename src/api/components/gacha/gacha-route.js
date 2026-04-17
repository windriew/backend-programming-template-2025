const controller = require('./gacha-controller');

module.exports = (app) => {
  app.post('/gacha', controller.gacha);
  app.get('/history/:userId', controller.history);
  app.get('/prizes', controller.prizes);
  app.get('/winners', controller.winners);
};
