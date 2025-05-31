const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb.getDb().db().collection('oils').find()
  .toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid oil id to find a oil.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb.getDb().db().collection('oils').find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createOil = async (req, res) => {
    const oil = {
      Name: req.body.Name,
      Brand: req.body.Brand,
      Description: req.body.Discription,
      Directions: req.body.Directions,
      Made: req.body.Made
    };
    const response = await mongodb.getDb().db().collection('oils').insertOne(oil);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the oil.');
    }
  };
  const updateOil = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid oil id to update a oil.');
    }
  
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const oil = {
      Name: req.body.Name,
      Brand: req.body.Brand,
      Description: req.body.Discription,
      Directions: req.body.Directions,
      Made: req.body.Made
    };
    
    const response = await 
    mongodb.getDb().db().collection('oils').replaceOne({ _id: userId }, oil);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the oil.');
    }
  };

  const deleteOil = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid oil id to delete a oil.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await 
    mongodb.getDb().db().collection('oils').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the Oil.');
    }
  };


module.exports = { getAll, getSingle, createOil, updateOil, deleteOil };
