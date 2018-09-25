// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
const taskList = require('../data/todo_list.js');

// Sample table is a dummy table for validation purposes
const sampleTodo = require('../data/sample-todo.json');

// ROUTING
// ===============================================================================
module.exports = function (app) {

  // GET Request
  app.get('/api/todo_list', function (req, res) {
    res.json(taskList);
  });

  // POST Request
  // Responds with success: true or false if successful
  app.post('/api/todo_list', function (req, res) {
    console.log(req.body, "this should be the new task");
    // Checks to make sure every property on the req.body is also on sample-todo
    // If it's not, returns with success: false and exits the function
    // for (let key in req.body) {
    //   if (!sampleTodo.hasOwnProperty(key)) {
    //     return res.json({ success: false });
    //   }
    // }

    // Checks to make sure every property on the sample-todo is also on req.body
    // If it's not, returns with success: false and exits the function
    // for (let key in sampleTodo) {
    //   if (!req.body.hasOwnProperty(key)) {
    //     return res.json({ success: false });
    //   }
    // }

    // Ensure boolean values for item status
    // req.body.todoStatus = req.body.todoStatus === 'true';

    // Add a new todo
    taskList.push(req.body);

    // Send back a confirmation the POST was successfully processed to end the response
    res.json(taskList);
  });

  // API Requests for /api/todolist/:index
  // Below code controls what happens when a request is made to /api/tasklist/:index

  // GET Request
  // Responds with just the requested table at the referenced index
  app.get('/api/todo_list/:index', function (req, res) {
    res.json(taskList[req.params.index]);
  });

  // PUT Request
  // Responds with success: true or false if successful
  app.put('/api/todo_list', function (req, res) {
   
    // Checks to make sure every property on the req.body is also on sample-todo
    // If it's not, returns with success: false and exits the function
    for (let key in req.body) {
      if (!sampleTodo.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }

    // Checks to make sure every property on the sample-todo is also on req.body
    // If it's not, returns with success: false and exits the function
    for (let key in sampleTodo) {
      if (!req.body.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }

    // Ensure boolean values for item status
    req.body.todoStatus = req.body.todoStatus === 'true';

    taskList.splice(req.params.index, 1, req.body);
    res.json({ success: true });
  });

  // DELETE Request
  // Responds with success: true or false if successful
  // app.delete('/api/todo_list/:index', function (req, res) {
  //   const chosen = req.params.todo;
  //   let success = false;
  //   for (let index = 0; index < todoList.length; index++) {
  //   console.log(req.body);
  //   taskList.splice(req.params.index, 1, req.body);
  //   res.json({ success: true })
  // };
  
  app.post('/api/delete/todo_list', function (req, res) {
    console.log(req.body);
    taskList.splice(req.body.index, 1);
    res.json(taskList);
  });
};