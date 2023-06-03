const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');


const manController = require('../controllers/manchester');
const validation = require('../middleware/validate');

router.get('/', manController.getAll);

router.get('/:id', manController.getSingle);

router.post('/', requiresAuth(), validation.savePlayer, manController.createPlayer);

router.put('/:id', requiresAuth(), validation.savePlayer, manController.updatePlayer);

router.delete('/:id', requiresAuth(), manController.deletePlayer);

module.exports = router;