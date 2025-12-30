const db = require('../config/db');

// Fonction pour créer un utilisateur dans la base de données
function createUser(utilisateur, callback) {
    const values = [
        utilisateur.nom,
        utilisateur.prenom,
        utilisateur.email,
        utilisateur.mot_de_passe,
        utilisateur.role
    ]
    db.query(
        'INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
        values,
        (err, result) => {
            if (err) {
                console.error('Erreur SQL dans createUser :', err);
                return callback(err);
            }
            callback(null, {
                id: result.insertId,
                ...utilisateur
            });
        }
    );
}

function findByEmail(email, callback) {
    db.query(
        'SELECT * FROM utilisateur WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                /*console.error('Erreur SQL dans findByEmail :', err);*/
                return callback(err);
            }
            callback(null, results[0]);
        }
    );
};


module.exports = { createUser, findByEmail };