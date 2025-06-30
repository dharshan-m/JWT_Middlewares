const express = require('express');


const router = express.Router();

const {registerUser, loginUser} = require('../Controller/authController');

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

module.exports = router;