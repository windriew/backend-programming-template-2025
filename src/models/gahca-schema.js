module.exports = (db) =>
  db.model(
    'Gachas',
    db.Schema({
      userId: String,
      prize: {
        type: String,
        default: null,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    })
  );
