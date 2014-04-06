define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'peek',
  'views/grocery/listapp',
  'text!templates/grocery/tplGroceryViewTemplate.html'
], function($, _, Backbone, Bootstrap, Peek, ListAppView, tplGroceryViewTemplate){

  var GroceryView = Backbone.View.extend({
    el: $("#page"),
    render: function(){
      $('.nav li').removeClass('active');
      $('.nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.html(tplGroceryViewTemplate);

      var app_view = new ListAppView;

    }
  });

  return GroceryView;
});