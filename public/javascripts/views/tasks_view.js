var app = app || {};

app.TasksView = Backbone.View.extend({

  views: [],

  el: $("#scrumboard"),

  render: function() {

    $("#scrumboard tbody tr td").droppable({      
      drop: function(event, ui) {
   
      var taskColumn = $(event.target).attr('id');       
      var cardId = $(ui.draggable).attr("id");
      var task = app.tasks.where({id: cardId})[0];
      task.column = taskColumn.toString();
      task.save();
      //task.save(task.attributes);
     }
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

    this.listenTo(app.tasks, 'add', this.addOne);
    this.listenTo(app.tasks, 'reset', this.addAll);
    this.listenTo(app.tasks, 'all', this.render);

    //$("#scrumboard").show();
    app.tasks.fetch({ reset: true });
  },

  addOne: function(task) {
    var view = new TasksView({model: task});
    this.$("#todo").append(view.render().el);
  },

  addAll: function() {

    // app.tasks.each(this.addOne, this);
    for(var i = 0; i < this.views.length; i++) {
      this.views[i].delete();
    }
  
    app.tasks.each(this.addTaskView, this); 
  }

});


app.TaskView = Backbone.View.extend({

  events: {
    "click .edit": "edit",
    "click .delete": "delete"
  },

  template: _.template($('#task-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.render();
  },

  render: function() {
  
    this.$el.html(this.template(this.model.attributes));
    this.input = this.$('.edit');
    
    return this;
  },

  edit: function() {
    this.$el.addClass("editing");
    this.input.focus();
  },

  delete: function() {
    this.model.destroy();
  }

});
