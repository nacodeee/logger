const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve('./ips.db'), (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS ips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT
        )`);
    }
});

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { ip } = req.body;
        if (!ip) {
            return res.status(400).json({ error: 'IP es requerida' });
        }

        db.run(`INSERT INTO ips(ip) VALUES(?)`, [ip], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ id: this.lastID });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
