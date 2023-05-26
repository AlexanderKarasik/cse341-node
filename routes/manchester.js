const express = require('express');
const router = express.Router();

const manController = require('../controllers/manchester');
const validation = require('../middleware/validate');

router.get('/', manController.getAll);

router.get('/:id', manController.getSingle);

router.post('/', validation.savePlayer, manController.createPlayer);

router.put('/:id', validation.savePlayer, manController.updatePlayer);

router.delete('/:id', manController.deletePlayer);

module.exports = router;