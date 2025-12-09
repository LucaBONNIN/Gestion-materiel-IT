const db = require('../config/db');

//fonction pour ajouter un produit dans la bdd
function createProduit(produit, callback) {
    const values = [
        produit.nom,
        produit.reference,
        produit.id_categorie,
        produit.quantite_actuelle,
        produit.quantite_min,
        produit.emplacement
    ]
    db.query(
        'INSERT INTO produit (nom, reference, id_categorie, quantite_actuelle, quantite_min, emplacement) VALUES (?, ?, ?, ?, ?, ?)',
        values,
        (err, result) => {
            if (err) {
                console.error('Erreur SQL dans createProduit :', err);
                return callback(err);
            } 

            callback(null, {
                id: result.insertId,
                ...produit
            });
        }
    );
}

module.exports = { createProduit };