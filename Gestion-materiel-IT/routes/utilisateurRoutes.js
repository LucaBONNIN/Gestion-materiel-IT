const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// route de test
router.get('/', (req, res) => {
    res.json({ message: 'Route utilisateurs OK' });
}); 

// 1) Affiche la page 
router.get('/ajouter', (req, res) => {
    res.render('ajouterUtilisateur');
});

// 2) Traite le formulaire
router.post('/ajouter', (req, res) => {
    return res.redirect('/utilisateurs/ajouter');
});

module.exports = router;