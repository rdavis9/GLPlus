define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'peek',
  'models/owner/OwnerModel',  
  'text!templates/footer/footerTemplate.html'
], function($, _, Backbone, Bootstrap, Peek, OwnerModel, footerTemplate){

  var FooterView = Backbone.View.extend({
    el: $("#footer"),

    initialize: function() {

      var that = this;
      var options = {query: 'rdavis9'}
     

      var onDataHandler = function(collection) {
          that.render();
      }

      this.model = new OwnerModel(options);
      this.model.fetch({ success : onDataHandler, dataType: "jsonp"});

    },

    render: function(){

      var data = {
        owner: this.model.toJSON(),
        _: _ 
      };

      var compiledTemplate = _.template( footerTemplate, data );
      this.$el.html(compiledTemplate);
    }

  });

  return FooterView;
  
});