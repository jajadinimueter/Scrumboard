var app = app || {};

app.TasksView = Backbone.View.extend({

  views: [],

  render: function() {

    $("#scrumboard tbody tr td").droppable({      
      drop: taskDrop
    });
  },

  addTaskView: function(task) {

    var myTaskView = new app.TaskView({ model: task });

    this.views.push(myTaskView);

    var myRenderedElement = $(myTaskView.render().el);
    myRenderedElement.attr("id", task.get("id"));
    myRenderedElement.draggable({containment: "#scrumboard"});

    $('#' + task.get('column')).append(myRenderedElement);
  },

  initialize: function() {

    $("#scrumboard").show();
    //console.log(this.collection);
    this.collection.fetch({ reset: true });
    this.listenTo(this.collection, 'reset', this.addAll);
  },

  addAll: function() {

    for(var i = 0; i < this.views.length; i++) {
      this.views[i].delete();
    }
  
    this.collection.each(this.addTaskView, this); 
  }

});


app.TaskView = Backbone.View.extend({

  events: {
    "click #delete": "delete"
  },

  template: _.template($('#task-template').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    template = _.template($('#task-template').html());
    //this.$el.html(template, this.model.toJSON());   // principally correct (not working)
    //this.$el.html(this.template, JSON.stringify(this.model));
    this.$el.html(this.template(this.model));
    this.$el.addClass("task");

    return this;
  },

  delete: function() {
    this.model.destroy();
  }

});
