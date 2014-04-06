define(['underscore', 'backbone'], function(_, Backbone) {
  var GlistModel = Backbone.Model.extend({

    // Default attributes for the list.
    defaults: {
      content: "empty list...",
      done: false
    },

    // Ensure that each list created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this list item.
    toggle: function() {
      this.save({done: !this.get("done")});
    },

    // Remove this glist from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
      this.view.remove();
    }

  });
  return GlistModel;
});