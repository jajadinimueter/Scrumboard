var app = app || {};

app.Tasks = Backbone.Collection.extend({
  model: app.Task,
  url: '/tasks',

  createAndAddNewTask: function(data) {
    var task = new app.Task(data);
    //console.log(task.attributes);
    app.tasks.add(task);
    //console.log(app.tasks);
    task.save();
    //task.set(task.attributes);
  }

});

app.tasks = new app.Tasks();
