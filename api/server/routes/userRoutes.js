const express = require('express');
const UserController = require('../controllers/userController')


const router = express.Router();

router.route('/')
    .get(UserController.getAllUsers)
    .post(UserController.createUser)


router.route('/:id')
    .get(UserController.getAUser)
    .post(UserController.deleteUser)

module.exports = router
