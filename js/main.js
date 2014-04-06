require.config({
	paths: {
		"jquery": "libs/jquery/jquery-1.11.0.min",
		"underscore": "libs/underscore/underscore-min",
		"backbone": "libs/backbone/backbone-min",
		"bootstrap": "libs/bootstrap/bootstrap",
		"peek": "libs/jquery/jquery.peek.min",
		"templates": '../templates'
	}
});


require([
	'app',
	], function(App){

			App.initialize();
});

