const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');


const teamController = require('../controllers/teams');
const validation = require('../middleware/validate');

router.get('/', teamController.getAll);

router.get('/:id', teamController.getSingle);

router.post('/', requiresAuth(), validation.saveTeam, teamController.createTeam);

router.put('/:id', requiresAuth(), validation.saveTeam, teamController.updateTeam);

router.delete('/:id', requiresAuth(), teamController.deleteTeam);

module.exports = router;