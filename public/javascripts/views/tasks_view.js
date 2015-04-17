var app = app || {};

app.TasksView = Backbone.View.extend({

  views: [],

  el: $("#scrumboard"),

  render: function() {

    $("#scrumboard tbody tr td").droppable({      
      drop: function(event, ui) {
   
      var taskColumn = $(event.target).attr('id');
      //console.log(taskColumn);       
      var cardId = $(ui.draggable).attr("id");
      var task = app.tasks.where({id: cardId})[0];
      //console.log(task);
      task.set("column", taskColumn.toString());
      //console.log(task.attributes);
      task.set();
      //task.save();
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

    //this.listenTo(app.tasks, 'add', this.addOne);
    //this.listenTo(app.tasks, 'all', this.render);

    //$("#scrumboard").show();
    app.tasks.fetch({ reset: true });
    this.listenTo(app.tasks,'reset',this.addAll);
  },

  addOne: function(task) {
    var view = new app.TaskView({model: task});
    //console.log(view);
    this.$("#todo").append(view.render().el);
  },

  addAll: function() {
    app.tasks.each(this.addOne, this);
    for(var i = 0; i < this.views.length; i++) {
      this.views[i].destroy();
    }
  
    app.tasks.each(this.addTaskView, this); 
  }

});


app.TaskView = Backbone.View.extend({

  events: {
    "click .edit": "edit",
    "click .save": "save",
    //"click .delete": "destroy"
  },

  template: _.template($('#task-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'edit', this.edit);
    this.listenTo(this.model, 'save', this.save);
    this.listenTo(this.model, 'delete', this.destroy);
    //this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));    
    return this;
  },

  // cf. for editing: http://codepen.io/gab/pen/dJmIE

  edit: function() {
    this.$('.edit').hide();
    this.$('.taskCard').addClass('editable');
    this.$('.task_head').attr('contenteditable', 'true');  
    this.$('.task_description').attr('contenteditable', 'true');  
    this.$('.task_responsible').attr('contenteditable', 'true');  
    this.$('.save').show();
  },

  save: function() {
    this.$('.save').hide();
    this.$('.taskCard').removeClass('editable');
    this.$('.task_head').removeAttr('contenteditable');  
    this.$('.task_description').removeAttr('contenteditable');  
    this.$('.task_responsible').removeAttr('contenteditable');  
    this.$('.edit').show();
  },

  destroy: function() {
    this.model.destroy();
  }

});
