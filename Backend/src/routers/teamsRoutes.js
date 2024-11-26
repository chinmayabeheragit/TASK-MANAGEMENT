const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const teamController = require('../controllers/teamsController');


router.post('/create-team',teamController.createTeam);


module.exports = router