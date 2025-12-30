const utilisateurModel = require('../models/utilisateurModel');

// Fonction pour valider le mail de l'utilisateur

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}