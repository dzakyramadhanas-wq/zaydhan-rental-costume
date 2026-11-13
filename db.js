const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./rentcostume.db');

db.serialize(() => {
  // 1. Buat Tabel Kostum jika belum ada
  db.run(`
    CREATE TABLE IF NOT EXISTS costumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      size TEXT NOT NULL,
      price_per_day REAL NOT NULL,
      deposit_fee REAL NOT NULL,
      status TEXT DEFAULT 'available'
    )
  `);

  // 2. Isi Data Awal (Guren, Hanako, Miya) Otomatis Jika Database Masih Kosong
  db.get('SELECT COUNT(*) as count FROM costumes', [], (err, row) => {
    if (err) return;
    if (row.count === 0) {
      const insertSql = `INSERT INTO costumes (title, category, size, price_per_day, deposit_fee) VALUES (?, ?, ?, ?, ?)`;
      db.run(insertSql, ['Guren Ichinose (Owari no Seraph)', 'Cosplay', 'M', 85000, 50000]);
      db.run(insertSql, ['Hanako-kun (Jibaku Shounen Hanako-kun)', 'Cosplay', 'S', 80000, 50000]);
      db.run(insertSql, ['Miya Chinen (SK8 the Infinity)', 'Cosplay', 'L', 75000, 50000]);
      console.log('Kostum default (Guren, Hanako, Miya) berhasil ditambahkan ke database!');
    }
  });

  // 3. Buat Tabel Transaksi Sewa
  db.run(`
    CREATE TABLE IF NOT EXISTS rentals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      renter_name TEXT NOT NULL,
      costume_id INTEGER,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      total_price REAL NOT NULL,
      deposit_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (costume_id) REFERENCES costumes (id)
    )
  `);
});

module.exports = db;