const express = require('express');
const UserAuth = require('../../controllers/auth/userAuth')


const router = express.Router();

router.route('/register').post(UserAuth.userRegister)
router.route('/login').post(UserAuth.userLogin)
router.route('/logout').post(UserAuth.userLogout)

module.exports = router