$(function() {

  app.tasks = new app.Tasks();

  app.tasksView = new app.TasksView();

  $('#submit').on('click', function() {
    app.tasks.createAndAddNewTask(
      {
      title: $('#title').val(),
      description: $('#description').val(),
      rating: $('#rating').val(),
      responsible: $('#responsible').val(),
      column: 'todo'
    });

    $('#title').val('');
    $('#description').val('');
    $('#rating').val(1);
    $('#responsible').val('');
  });

});
