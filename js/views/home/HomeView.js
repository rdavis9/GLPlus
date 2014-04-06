define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'peek',
  'views/sidebar/SidebarView',
  'text!templates/home/tplHomeView.html'
], function($, _, Backbone, Bootstrap, Peek, SidebarView, tplHomeView){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      
      $('.nav li').removeClass('active');
      $('.nav li a[href="#"]').parent().addClass('active');
      this.$el.html(tplHomeView);

      $('.navbar').peek();

      $('.navbar').peek({
      showDirection: "up", // What direction should the user be <a href="http://www.jqueryscript.net/tags.php?/<a href=" http:="" www.jqueryscript.net="" tags.php?="" scroll="" '="">Scroll</a>/'>scrolling when the element is showing.
      toggleClass: "hidden", // Class used to hide the element.
      triggerDelta: 50, // After a user has scrolled more than this many pixels show or hide the target element.
      triggerElement: window // Element to bind the scroll event to.
      });

      var sidebarView = new SidebarView();
      sidebarView.render();
 
    }

  });

  return HomeView;
  
});