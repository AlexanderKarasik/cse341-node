const express = require('express');
const router = express.Router();

const barController = require('../controllers/barcelona');

router.get('/', barController.getAll);

router.get('/:id', barController.getSingle);

router.post('/', barController.createPlayer);

router.put('/:id', barController.updatePlayer);

router.delete('/:id', barController.deletePlayer);

module.exports = router;