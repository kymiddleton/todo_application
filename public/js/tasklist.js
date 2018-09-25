// jQuery handler that runs the encapsulated code when the page is ready.
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

      //Testing Render
      const listItem = $('<div>').addClass('todo');

      const label = $('<label>').addClass('fancy-checkbox');
      const checkbox = $('<input type="checkbox">')
        .attr('checked', dataList.todoStatus)
        .addClass('todoStatus')
        .attr('data-index', index);

      label.append(checkbox);
      label.append('<i class="fas fa-check-square checked">');
      label.append('<i class="far fa-square unchecked">');

      listItem.append(label,
        $('<span>').text(dataList.todoItem).addClass('list-text'),

        $('<button>')
          .addClass('delete')
          .attr('data-index', index)
          .append('<i>').addClass('fas fa-times')
      )

      //End Testing

      //Based on Activity 22 Reservations.
      // Then display the fields in the HTML (Section Name, Date, URL)
      // const listItem = $("<li class='list-group-item mt-4'>");

      // listItem.append(
      //   $("<h2>").text("ID: " + dataList[i].todoItem),
      //   $("<h2>").text("ID: " + dataList[i].todoStatus)

      // );

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
