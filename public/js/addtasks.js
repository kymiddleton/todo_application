$(function () {
    const state = {
        toDoList: [],
    };

    $('#submit').on('click', function (event) {
        event.preventDefault();
        console.log('Submit works');

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
            const textDiv = $('<div>');
            const checkbox = $('<i class="far fa-square unchecked complete">');
            const button = $('<i class="fas fa-times">');

            listTag.append()
            listTag.append(checkbox);
            addUpdateListener(checkbox);

            listTag.append(textDiv);
            listTag.append(button);
            
            textDiv.addClass('textDiv');
            textDiv.text(e.todoItem);

            // button.text('x');
            button.addClass('delete');
            button.attr('data-index', index);
            
            $('#addTasks').append(listTag);
            
    });
    addDeleteListener();
}

function toggleCheckbox (element) {
    if($(element).hasClass('fa-square')){
    $(element).removeClass('fa-square');
    $(element).addClass('fa-check-square');
    }else {
        $(element).removeClass('fa-check-square');
        $(element).addClass('fa-square');
    }
}

function addUpdateListener (element) {
    $(element).on('click', function () {
        toggleCheckbox(this);
    })
    let descriptionTag = $(element).siblings("div").first();
    let text = descriptionTag.text();
    const addtasksArray = 
        {
            todoItem: text,
            todoStatus: false
        }
    ;
    
    $.post('/api/update/todo_list', addtasksArray).then(function(data){
        populateList(data); //Don't think this works....
    }) 
}

function addDeleteListener() {
    $(".delete").on('click', function () {
        const deleteThisIndex = {
            index: $(this).attr('data-index')
        }

        $.post('/api/delete/todo_list', deleteThisIndex, function (data) {
            populateList(data);
        });

    });
}