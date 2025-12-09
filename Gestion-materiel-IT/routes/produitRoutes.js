const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

// route de test
router.get('/', (req, res) => {
    res.json({ message: 'Route produits OK' });
});

router.get('/ajouter', (req, res) => {
    res.render('ajouterPC');
});

router.post('/', produitController.createProduit);

module.exports = router;