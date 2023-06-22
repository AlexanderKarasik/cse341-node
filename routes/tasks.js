const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');


const taskController = require('../controllers/tasks');
const validation = require('../middleware/validate');


router.get('/', taskController.getAll);

router.get('/:id', taskController.getSingle);

router.post('/', requiresAuth(), validation.saveTask, taskController.createTask);

router.put('/:id', requiresAuth(), validation.saveTask, taskController.updateTask);

router.delete('/:id', requiresAuth(), taskController.deleteTask);

module.exports = router;