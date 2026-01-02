const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// route de test
router.get('/', (req, res) => {
    res.json({ message: 'Route utilisateurs OK' });
}); 

// 1) Affiche la page 
router.get('/ajouter', (req, res) => {
    if (req.query.success === '1') {
        res.render('utilisateurs/ajouter', { successMessage: 'Utilisateur ajouté avec succès !' });
    }
});

// 2) Traite le formulaire
router.post('/ajouter', (req, res) => {
    return res.redirect('utilisateurController.createUserWeb');
});

module.exports = router;