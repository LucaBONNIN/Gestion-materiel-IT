const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');


// route de test
router.get('/', (req, res) => {
    res.json({ message: 'Route utilisateurs OK' });
}); 

// 1) Affiche la page 
router.get('/ajouter', (req, res) => {
    //if (req.query.success === '1') {
    //    res.render('utilisateurs/ajouter', { successMessage: 'Utilisateur ajouté avec succès !' });
    //}
    /*return res.send('OK GET ajouter utilisateur');*/
    return res.render('ajouterUtilisateur', { successMessage: 'Utilisateur ajouté ' });
});

router.post('/ajouter', utilisateurController.createUser);

module.exports = router;