define([
  'jquery',
  'underscore', 
  'backbone',
  'bootstrap',
  'peek',
  'collections/grocery/glist',
  'views/grocery/glist',
  'text!templates/stats.html'
  ], function($, _, Backbone, Bootstrap, Peek, Glist, TodoView, statsTemplate){
  var ListAppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#page"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template(statsTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "keyup #new-todo":     "showTooltip",
      "click .todo-clear a": "clearCompleted"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll', 'render');

      this.input    = this.$("#new-todo");

      Glist.bind('add',     this.addOne);
      Glist.bind('reset',   this.addAll);
      Glist.bind('all',     this.render);

      Glist.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Glist.done().length;
      this.$('#todo-stats').html(this.statsTemplate({
        total:      Glist.length,
        done:       Glist.done().length,
        remaining:  Glist.remaining().length
      }));
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(glist) {
      var view = new TodoView({model: glist});
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Glist.each(this.addOne);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   Glist.nextOrder(),
        done:    false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      Glist.create(this.newAttributes());
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(Glist.done(), function(glist){ glist.clear(); });
      return false;
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });
  return ListAppView;
});