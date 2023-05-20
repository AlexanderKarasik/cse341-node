const express = require('express');
const router = express.Router();

const manController = require('../controllers/manchester');

router.get('/', manController.getAll);

router.get('/:id', manController.getSingle);

router.post('/', manController.createPlayer);

router.put('/:id', manController.updatePlayer);

router.delete('/:id', manController.deletePlayer);

module.exports = router;