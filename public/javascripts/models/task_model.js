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
  last_id: 0,

/*
  tasks: [
    {
      id: '0',
      title: 'Test entry',
      description: 'This is a test description.',
      rating: '2',
      responsible: 'Andrew',
      column: 'todo'
    }
  ],
*/

  getNextId: function() {
    this.last_id += 1;
    return this.last_id;
  },

  clone: function(data) {
    // JavaScript doesn't have a real clone function
    // This is good enough for simple, data-only objects
    return JSON.parse(JSON.stringify(data));
  },

  add: function(data) {
    var data = this.clone(data);
    var id = this.getNextId();
    data.id = id.toString();
    this.tasks.push(data);
    return data;
  },

  save: function(data) {
    var data = this.clone(data);
    var id = this.getNextId();
    data.id = id.toString();
    this.tasks.push(data);
    return data;
  },

});
