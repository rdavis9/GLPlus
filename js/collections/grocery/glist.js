define([
  'underscore', 
  'backbone', 
  'libs/backbone/backbone.localstorage-min', 
  'models/grocery/glist'
  ], function(_, Backbone, Store, Glist){

	var GlistCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Glist,

    // Save all of the glist items under the `"glist"` namespace.
    localStorage: new Store("glist"),

    // Filter down the list of all glist items that are finished.
    done: function() {
      return this.filter(function(glist){ return glist.get('done'); });
    },

    // Filter down the list to only glist items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the glist in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(glist) {
      return glist.get('order');
    }

  });
  return new GlistCollection;
});