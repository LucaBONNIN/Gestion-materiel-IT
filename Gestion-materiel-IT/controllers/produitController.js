const produitModel = require('../models/produitModel');

// Récupération des données de ajoputerPC.pug et ajout d'un produit dans la bdd
exports.createProduit = (req, res) => {

    const data = req.body;

    if (!data.nom || !data.reference || !data.id_categorie) {
        return res.status(400).json({ message: "Champs obligatoires manquants" });
    }
    if (data.quantite_actuelle < 0 || data.quantite_min < 0) {
        return res.status(400).json({ message: "Les quantités ne peuvent pas être négatives" });
    }

    produitModel.createProduit(data, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'ajout du produit" });
        } else {
            return res.status(201).json({ message: "Produit ajouté", produit: result });
        }
    });

};