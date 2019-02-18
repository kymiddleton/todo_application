// Require all models
const db = require('../models');

// LOAD DATA: Linking our routes to a series of "data" sources
const taskList = require('../data/todo_list');

// ROUTING
module.exports = function (app) {

  // GET request: Route for retrieving all items from the database.
  app.get('/api/todo_list', function (req, res) {
    // Find all Inventory
    db.Todo.find({})
        .then(function (dbTodo) {
            res.json(dbTodo);
        })
        .catch(function (err) {
            res.json(err);
        });
  });

  // POST request: Route for saving a new Inventory entry to the database.
  app.post('/api/todo_list', function (req, res) {
    db.Todo.create(req.body)
      .then(function (dbTodo) {
          res.json(dbTodo);
      })
      .catch(function (err) {
          res.json(err);
      });
  });

  // Route for saving updates 
  app.put('/api/todo_list', function (req, res) {
  // Find an entry by ID 
  db.Todo.findOneAndUpdate({itemID: req.body.itemID}, {$set: {itemCount: req.body.itemCount}})
      .then(function (dbTodo) {
          res.json(dbTodo);
      })
      .catch(function(err) {
          res.json(err);
      });
  });
};