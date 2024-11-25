const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth')

router.post('/create-project',projectController.createProject);

module.exports = router;