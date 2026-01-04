const utilisateurModel = require('../models/utilisateurModel');
const { isValidEmail } = require('../Utils/validators');
const { findByEmail } = utilisateurModel;

// Récupération des données de ajouterUtilisateur.pug et ajout d'un utilisateur dans la bdd

exports.createUser = (req, res) => {
    const data = req.body;
    console.log(data);

    if (!data.nom || !data.prenom || !data.email || !data.role) {
        return res.render('ajouterUtilisateur', { errorMessage: "Champs obligatoires manquants", formData: data })
    }
    if (!isValidEmail(data.email)) {
        return res.render('ajouterUtilisateur', { errorMessage: "Email invalide", formData: data })
    }
    if (data.role !== "admin" && data.role !== "user") {
        return res.render('ajouterUtilisateur', { errorMessage: "Veuillez entrer un role autorisé (user/admin)", formData: data })
    }

    findByEmail(data.email, (err, existingMailUser) => {
        if (err) {
            return res.render('ajouterUtilisateur', { errorMessage: "Erreur serveur / SQL", formData: data })
        }
        if (existingMailUser) {
            return res.render('ajouterUtilisateur', { errorMessage: "Email déjà utilisé", formData: data })
        }
        utilisateurModel.createUser(data, (err, newUser) => {
            if (err) {
                return res.render('ajouterUtilisateur', { errorMessage: "Erreur SQL", formData: data });
            }
            return res.render('utilisateurCree', { utilisateur: data});
        });
    });

};

