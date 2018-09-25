// In this code below we create the Front-end JavaScript which 'POSTS' our form data to our express server.
// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
// In this case the associated code 'saves' the data to the table-data.js file or waitinglist-data.js file

// jQuery handler that runs the encapsulated code when the page is ready.
$(function () {
    // In this code, jQuery is used to "download" the data from our server

    // Click listener for the submit button
    $('#submit').on('click', function (event) {
        event.preventDefault();
        console.log('Submit works');

        // Here we grab the form elements
        const newTodo = {
            todoItem: $('#todo-input').val().trim()
        };

        if (newTodo.todoItem === '') {
            alert('Todo Item Required');
        }

        $.ajax({ url: "/api/todo_list", method: "POST", data: newTodo }).then(function (data) {
            console.log(data, "This should be the updated list");
            // Clear the form when submitting
            populateList(data);
            $('#todo-input').val('');
            $('#todo-input').focus();
        });
    });
});

function populateList(data) {
    $('#addTasks').empty();
    data.forEach((e, index) => {
        const listTag = $('<li>');
        const button = $('<button>');
        const textDiv = $('<div>');
        textDiv.addClass('textDiv');
        textDiv.text(e.todoItem);
        button.text('x');
        button.addClass('delete');
        button.attr('data-index', index);
        listTag.append(textDiv);
        listTag.append(button);
        $('#addTasks').append(listTag);
        // const label = $('<label>').addClass('fancy-checkbox');
        // const checkbox = $('<input type="checkbox">')
        //     .attr('checked', todoStatus)
        //     .addClass('todoStatus')
        //     .attr('data-index', index);
    });
    addDeleteListner();
}

function addDeleteListner() {
    $(".delete").on('click', function () {
        const deleteThisIndex = {
            index: $(this).attr('data-index')
        }

        $.post('/api/delete/todo_list', deleteThisIndex, function (data) {
            populateList(data);
        });

    });
}