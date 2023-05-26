const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('manchester').find();
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
      res.status(400).json('Must use a valid player id to find a player.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('manchester')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch(err) {
      res.status(500).json(err);
    }
    };

  const createPlayer = async (req, res) => {
    try{
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      country: req.body.country,
      birthday: req.body.birthday,
      joined: req.body.joined,
      debut: req.body.debut
    };
    const response = await mongodb.getDb().db().collection('manchester').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the player.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };

  const updatePlayer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid player id to update a player.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        country: req.body.country,
        birthday: req.body.birthday,
        joined: req.body.joined,
        debut: req.body.debut
      };
      const response = await mongodb.getDb().db().collection('manchester').replaceOne({ _id: userId }, contact);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the player.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};

  const deletePlayer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid player id to delete a player.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('manchester').deleteOne({ _id: userId });
      console.log(response)
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the player.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};
  
  module.exports = { getAll, getSingle, createPlayer, updatePlayer, deletePlayer };