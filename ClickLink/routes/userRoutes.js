const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Add more routes as needed

module.exports = router;
