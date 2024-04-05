const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: '193.203.184.53',
    user: 'u114727550_artherv',
    password: 'Artherv@321',
    database: 'u114727550_artherv_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        connection.query('SELECT vch_no FROM Estimated_CS_header ORDER BY master_id DESC LIMIT 1', (err, results) => {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Error fetching data');
                return;
            }

            const lastVchNo = results[0]?.vch_no || 'EC-23-24-0000';
            const parts = lastVchNo.split('-');
            const prefix = parts.slice(0, -1).join('-') + '-';
            const lastDigits = parseInt(parts[parts.length - 1]);
            const newLastDigits = (lastDigits + 1).toString().padStart(parts[parts.length - 1].length, '0');
            const newVchNo = prefix + newLastDigits;

            res.json( newVchNo);
        });
    })
});

module.exports = router;
