const express = require('express');
const router = express.Router();

const barController = require('../controllers/barcelona');
const validation = require('../middleware/validate');


router.get('/', barController.getAll);

router.get('/:id', barController.getSingle);

router.post('/', validation.savePlayer, barController.createPlayer);

router.put('/:id', validation.savePlayer, barController.updatePlayer);

router.delete('/:id', barController.deletePlayer);

module.exports = router;