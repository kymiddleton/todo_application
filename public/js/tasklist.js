$(function () {
  // In this code, jQuery is used to "download" the data from our server
  // We then dynamically display this content in our table. This is very similar to the group projects you just completed.

  const render = function () {

    // Run Queries!
    // ==========================================
    runTaskListQuery();
  }

  const renderTaskList = function (outputElement, dataList) {
    // Loop through and display each of the customers
    for (let index = 0; index < dataList.length; index++) {

      // Get a reference to the tableList element and populate it with tables
      const output = $(outputElement);

      output.append(listItem);
    }
  }

  const runTaskListQuery = function () {

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({ url: "/api/todo_list", method: "GET" })
      .then(function (taskList) {
        renderTaskList('#taskList', taskList);
      });
  }

  // This function resets all of the data on our list. This is intended to let you restart a demo.
  const clearList = function () {
    alert("Clearing...");

    // Clear the lists on the server and then empty the elements on the client
    $.ajax({ url: "/api/clear", method: "POST" }).then(function () {
      $("#addTasks").empty();
      $("#taskList").empty();
    });
  }

  $("#clear").on("click", clearList);

  // Render our data to the page
  //render();
});
