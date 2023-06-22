const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('teams').find();
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
      res.status(400).json('Must use a valid team id to find a team.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('teams')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch(err) {
      res.status(500).json(err);
    }
    };

  const createTeam = async (req, res) => {
    try{
    const team = {
      teamName: req.body.teamName,
      teamMembers: req.body.teamMembers,
      teamLeader: req.body.teamLeader,
      teamProfile: req.body.teamProfile,
      dateCreated: req.body.dateCreated
    };
    const response = await mongodb.getDb().db().collection('teams').insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the team.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };

  const updateTeam = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid team id to update a team.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const team = {
        teamName: req.body.teamName,
        teamMembers: req.body.teamMembers,
        teamLeader: req.body.teamLeader,
        teamProfile: req.body.teamProfile,
        dateCreated: req.body.dateCreated
      };
      const response = await mongodb.getDb().db().collection('team').replaceOne({ _id: userId }, team);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the team.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};

  const deleteTeam = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid team id to delete a team.');
    }
    try{
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('team').deleteOne({ _id: userId });
      console.log(response)
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the team.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};
  
  module.exports = { getAll, getSingle, createTeam, updateTeam, deleteTeam };