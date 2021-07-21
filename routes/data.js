const express = require('express');
const router = express.Router();
const { time, tokyo, london, headers } = require('../controllers/data');

// GET the time, http status, the location, headers
router.get('/', (req, res) => {
	res.render('index')
});

router.post('/', time, tokyo, london, headers);


module.exports = router;
