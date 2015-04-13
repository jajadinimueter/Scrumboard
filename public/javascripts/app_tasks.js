$(function() {

  var host = location.origin.replace(/^http/, 'ws')
  var ws = new WebSocket(host);

/*
  app.Router = new app.Router();
  console.log(Router);
  
  Backbone.history.start();
*/

  app.tasks = new app.Tasks();


  ws.onmessage = function (event) {

/*
    var tasksView = new app.TasksView({
      collection: app.tasks
    });
*/

    var task = JSON.parse(event.data);
    var taskView = new app.TaskView({
      model: task
    });

    var renderedTaskElement = $(taskView.render().el);
    renderedTaskElement.attr("id",task.id);
    renderedTaskElement.draggable({containment: "#scrumboard"});
    $('#todo').append(renderedTaskElement);

    $("#scrumboard tbody tr td").not('.task').droppable( {
      tolerance: 'fit',
      drop: taskDrop
    });

    function taskDrop(event, ui) {
   
      var taskColumn = $(event.target).attr('id');       
      var cardId = $(ui.draggable).attr("id");
        
      var task = app.tasks.where({id: cardId})[0];
      //console.log(app.tasks);
      //console.log(task);
      task.column = taskColumn.toString();
      task.save(task.attributes);
     };

  };

  $('#submit').on('click', function() {
    var task = new app.Task({
      title: $('#title').val(),
      description: $('#description').val(),
      rating: $('#rating').val(),
      responsible: $('#responsible').val(),
      column: 'todo'
    });
    task = task.save(task.attributes);
    app.tasks.add(task)

    ws.send(JSON.stringify(task));
    $('#title').val('');
    $('#description').val('');
    $('#rating').val(1);
    $('#responsible').val('');
  });

});
