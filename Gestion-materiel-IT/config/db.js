const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'LucaMySQL2025@',
    database: 'gestion_stock',
    port: 3306
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion MySQL :', err.message);
    } else {
        console.log('Connecte a MySQL');
        connection.release();
    }
});

module.exports = pool;