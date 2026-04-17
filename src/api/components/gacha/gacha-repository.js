const db = require('../../../models');

const Gacha = db.Gachas;

module.exports = {
  countToday: (userId) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    return Gacha.countDocuments({
      userId,
      createdAt: { $gte: start },
    });
  },

  countPrize: (prizeName) => Gacha.countDocuments({ prize: prizeName }),

  create: (data) => Gacha.create(data),

  findByUser: (userId) => Gacha.find({ userId }),
};
