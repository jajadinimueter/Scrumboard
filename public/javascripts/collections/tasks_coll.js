var app = app || {};

app.Tasks = Backbone.Collection.extend({
  model: app.Task,
  last_id: 1,
  url: '/tasks',

  getNextId: function() {
    this.last_id += 1;
    return this.last_id;
  },

  createAndAddNewTask: function(data) {
  	data.id = this.getNextId();
    var task = new app.Task(data);
    //console.log(task.attributes);
    app.tasks.add(task);
    //console.log(app.tasks);
    task.save();
    //task.set(task.attributes);
  }

});

app.tasks = new app.Tasks();
