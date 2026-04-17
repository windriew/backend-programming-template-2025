const gachaRepo = require('./gacha-repository');

const prizes = [
  { name: 'Emas 10 gram', quota: 1 },
  { name: 'Smartphone X', quota: 5 },
  { name: 'Smartwatch Y', quota: 10 },
  { name: 'Voucher 100k', quota: 100 },
  { name: 'Pulsa 50k', quota: 500 },
];

module.exports = {
  gacha: async (userId) => {
    const count = await gachaRepo.countToday(userId);

    if (count >= 5) {
      throw new Error('Batas gacha harian sudah tercapai');
    }

    const usedCounts = await Promise.all(
      prizes.map((p) => gachaRepo.countPrize(p.name))
    );

    const availablePrizes = prizes.filter((p, i) => usedCounts[i] < p.quota);

    let selectedPrize = null;

    if (availablePrizes.length > 0) {
      const rand = Math.floor(Math.random() * (availablePrizes.length + 1));

      if (rand < availablePrizes.length) {
        selectedPrize = availablePrizes[rand];
      }
    }

    await gachaRepo.create({
      userId,
      prize: selectedPrize ? selectedPrize.name : null,
    });

    return {
      message: selectedPrize ? 'Selamat!' : 'Maaf, belum beruntung',
      prize: selectedPrize ? selectedPrize.name : null,
    };
  },

  history: (userId) => gachaRepo.findByUser(userId),
};
