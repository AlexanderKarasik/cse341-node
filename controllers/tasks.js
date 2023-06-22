const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('tasks').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };
  
  const getSingle = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to find a task.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('tasks')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch(err) {
      res.status(500).json(err);
    }
    };

  const createTask = async (req, res) => {
    try{
    const task = {
      taskName: req.body.taskName,
      taskInitiator: req.body.taskInitiator,
      taskStartdate: req.body.taskStartdate,
      responsiblePerson: req.body.responsiblePerson,
      taskDeadline: req.body.taskDeadline,
      taskOutcome: req.body.taskOutcome,
      assignedTeam: req.body.assignedTeam,
    };
    const response = await mongodb.getDb().db().collection('tasks').insertOne(task);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the task.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };

  const updateTask = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to update a task.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const task = {
        taskName: req.body.taskName,
        taskInitiator: req.body.taskInitiator,
        taskStartdate: req.body.taskStartdate,
        responsiblePerson: req.body.responsiblePerson,
        taskDeadline: req.body.taskDeadline,
        taskOutcome: req.body.taskOutcome,
        assignedTeam: req.body.assignedTeam,
      };
      const response = await mongodb.getDb().db().collection('tasks').replaceOne({ _id: userId }, task);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the task.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};

  const deleteTask = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to delete a task.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('tasks').deleteOne({ _id: userId });
      console.log(response)
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the task.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};
  
  module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };