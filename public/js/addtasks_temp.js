const renderTodo = function (outputElement, toDoList, index) {
    const output = $(outputElement);

    const toDoListElement = $('<div>').addClass('toDo');

    const label = $('<label>').addClass('check-marker');
    const checkbox = $('<input type="checkbox">')
    .attr('checked', toDoList.completed)
    .addClass('todoStatus')
    .attr('data-index', index);

    label.append(checkbox);
    label.append('<i class=fas fa-check-square checked">');
    label.append('<i class=far fa-square unchecked">');

    output.append(toDoListElement);
}

$('body').on('click', '.completed', function (event) {
    const thisIndex = $(this).attr('data-index');
    const completed = event.target.checked;
    
    const toDoUpdate = state.toDoList[number(thisIndex)];
})





// function populateList(data) {
//     $('#addTasks').empty();
//     data.forEach((e, index) => {
//         const label = $('<label>');
//         const listTag = $('<li>');
//         const button = $('<i class="fas fa-times">');
//         const textDiv = $('<div>');
//         const checkbox = $('<i class="far fa-square unchecked complete">');

//         textDiv.addClass('textDiv');
//         textDiv.text(e.todoItem);
//         // button.text('x');
//         button.addClass('delete');
//         button.attr('data-index', index);
//         listTag.append()
//         listTag.append(checkbox);
//         listTag.append(textDiv);
//         listTag.append(button);
//         $('#addTasks').append(listTag);
        
//     });
//     addDeleteListner();
// }



// 
// $('#addTasks').toggleClass(function( unchecked, addOrRemove);
// if(addOrRemove) {
//     $('#addTasks').addClass(

//     )
//     if ($(this).parent().is()))
// $('.complete').on('click', function() {

// })