const express = require('express')
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

router.get('/',(req, res)=> {
    pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting database connection:', err);
          res.status(500).send('Error fetching data');
          return;
        }
        connection.query('SELECT design_no FROM demo_tb WHERE design_no != "N/A"', (err, results) => {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Error fetching data');
                return;
            }
            console.log(results)
            res.json(results);
        });
    })
})

module.exports = router;