//Filename: app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'peek',
  'router' 

], function($, _, Backbone, Bootstrap, Peek, Router){
  
		var initialize = function(){
			Router.initialize();
		} 

  return {
  	initialize: initialize
  };
  
});