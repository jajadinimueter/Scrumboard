var app = app || {};

app.Tasks = Backbone.Collection.extend({
  model: app.Task,
  url: '/',
});

app.tasks = new app.Tasks();