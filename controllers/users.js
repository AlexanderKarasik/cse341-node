const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('users').find();
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
      res.status(400).json('Must use a valid user id to find a user.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('users')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch(err) {
      res.status(500).json(err);
    }
    };

  const createUser = async (req, res) => {
    try{
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      country: req.body.country,
      nikName: req.body.nikName
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };

  const updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to update a user.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        country: req.body.country,
        nikName: req.body.nikName
      };
      const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, user);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};

  const deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to delete a user.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });
      console.log(response)
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};
  
  module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };