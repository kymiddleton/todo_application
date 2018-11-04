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


//routes from last week - no longer need for database

  // GET Request
//   app.get('/api/todo_list/:index', function (req, res) {
//     res.json(taskList[req.params.index]);
//   });

//   // PUT Request: Responds with success: true or false if successful
//   app.put('/api/todo_list', function (req, res) {
//     for (let key in req.body) {
//       if (!sampleTodo.hasOwnProperty(key)) {
//         return res.json({ success: false });
//       }
//     }
    
//     // Ensure boolean values for item status
//     req.body.todoStatus = req.body.todoStatus === 'true';
//     taskList.splice(req.params.index, 1, req.body);
//     res.json({ success: true });
//   });

//   // DELETE Request: Responds with success: true or false if successfu
//   app.post('/api/delete/todo_list', function (req, res) {
//     console.log(req.body);
//     taskList.splice(req.body.index, 1);
//     res.json(taskList);
//   });
// };