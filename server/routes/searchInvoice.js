const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Import mysql2/promise for async/await support
const cors = require('cors');

const router = express.Router();

// Create a connection pool to MySQL database
const pool = mysql.createPool({
    host: '193.203.184.53',
    user: 'u114727550_artherv',
    password: 'Artherv@321',
    database: 'u114727550_artherv_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

// Search endpoint
router.post('/', async (req, res) => {
    try {
        const { vchSearchValue } = req.body;
        console.log(vchSearchValue)
        // Array to hold the results from different tables
        const searchResults = [];

        // Tables to search
        const tables = ['Estimated_CS_header' , 'Estimated_CS_Item_Detail', 'Estimated_CS_JW_Detail'];

        // Loop through tables to perform search
        for (const table of tables) {
            // Query to search for the value in the current table
            const query = `SELECT * FROM ${table} WHERE vch_no = ?`;

            // Execute the query
            const connection = await pool.getConnection();
            const [results] = await connection.execute(query, [vchSearchValue]);
            connection.release();

            // Add results along with table and column names to searchResults array
            results.forEach((row) => {
                searchResults.push({
                    tableName: table,
                    data: row
                });
            });
        }

        console.log(searchResults)
        res.json(searchResults);
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
