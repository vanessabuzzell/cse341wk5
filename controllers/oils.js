const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('oils').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createOil = async (req, res) => {
    const oil = {
      Name: req.body.Name,
      brand: req.body.brand,
      discription: req.body.discription,
      directions: req.body.directions,
      made: req.body.made
    };
    const response = await mongodb.getDb().db().collection('oils').insertOne(oil);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };
  const updateOil = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const oil = {
      Name: req.body.Name,
      brand: req.body.brand,
      discription: req.body.discription,
      directions: req.body.directions,
      made: req.body.made
    };
    
    const response = await mongodb.getDb().db().collection('oils').replaceOne({ _id: userId }, oil);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the oil.');
    }
  };

  const deleteOil = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('oils').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the Oil.');
    }
  };


module.exports = { getAll, getSingle, createOil, updateOil, deleteOil };
