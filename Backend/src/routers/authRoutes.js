const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/auth')

// Route for user registration
router.post('/register', (req, res) => {
    console.log('Register endpoint hit');
    authController.registerUser(req, res);
});


// Route for admin to approve user
router.put('/approve/:accId/:status', authController.approveUser);

// Route for user login
router.post('/login', authController.loginUser);

// Route for password reset request
router.post('/reset-password', authController.resetPasswordRequest);

module.exports = router;
