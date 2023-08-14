const express = require('express');
const router = express.Router();
const {login,register,current} = require('../controllers/user');
const validateToken = require('../middleware/validateTokenHandler');


router.post('/login',login)

router.post('/register',register)

router.get('/current',validateToken,current)


module.exports = router;