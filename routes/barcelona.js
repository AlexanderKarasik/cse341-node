const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');


const barController = require('../controllers/barcelona');
const validation = require('../middleware/validate');


router.get('/', barController.getAll);

router.get('/:id', barController.getSingle);

router.post('/', requiresAuth(), validation.savePlayer, barController.createPlayer);

router.put('/:id', requiresAuth(), validation.savePlayer, barController.updatePlayer);

router.delete('/:id', requiresAuth(), barController.deletePlayer);

module.exports = router;