// Scrum board model


var app = app || {};

app.Task = Backbone.Model.extend({

  tasks: [],

  urlRoot: "/",
  id: "id",

  defaults: {
      id: '',
      title: '',
      description: '',
      rating: '',
      responsible: '',
			column: 'todo'
  },

});
