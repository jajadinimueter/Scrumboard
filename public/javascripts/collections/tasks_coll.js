var app = app || {};

app.Tasks = Backbone.Collection.extend({
  model: app.Task,
  last_id: 0,
  url: '/tasks',

  getNextId: function() {
    this.last_id += 1;
    return this.last_id;
  },

  createAndAddNewTask: function(data) {
  	data.id = this.getNextId();
    var task = new app.Task(data);
    app.tasks.add(task);
    task.save();
  }

});

app.tasks = new app.Tasks();