const express = require('express');
const router = express.Router();

// test
router.get('/', (req, res) => {
    res.json({ message: "Route auth OK" });
});

module.exports = router;
