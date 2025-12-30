const utilisateurModel = require('../models/utilisateurModel');
const { isValidEmail } = require('../Utils/validators');
const { findByEmail } = utilisateurModel;

// Récupération des données de ajouterUtilisateur.pug et ajout d'un utilisateur dans la bdd

exports.createUser = (req, res) => {
    const data = req.body;

    if (!data.nom || !data.prenom || !data.email || !data.role) {
        return res.status(400).json({ message: "Champs obligatoires manquants" });
    }
    if (!isValidEmail(data.email)) {
        return res.status(400).json({ message: "Adresse email invalide" });
    }
    if (data.role !== "admin" && data.role !== "user") {
        return res.status(400).json({ message: "Veuillez entrer un role valide (admin/user)" });
    }

    utilisateurModel.findByEmail(data.email, (err, existingMailUser) => {
        if (err) {
            return res.status(500).json({ message: "Erreur SQL" });
        }
        if (existingMailUser) {
            return res.status(400).json({ message: "Email déjà existant" });
        }
        utilisateurModel.createUser(data, (err, newUser) => {
            if (err) {
                return res.status(500).send("Erreur SQL");
            }
            return res.redirect('/utilisateurs/ajouter?success=1');
        });
    });

};

