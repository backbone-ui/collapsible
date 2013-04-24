// Backbone.js Content extension
//
// Created by: Lyndel Thomas (@ryndel)
// Source: https://github.com/backbone-ui/collapsible
//
// Licensed under the MIT license: 
// http://makesites.org/licenses/MIT

(function(_, Backbone) {
	
	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	// Support backbone app (if available)
	var View = ( typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
	
	Backbone.UI.Collapsible = View.extend({
		
		events: {
			"click h2": "toggle",
		},
		
		toggle: function( e ) {
			$(e.target).parent("section").siblings().removeClass("active");
			$(e.target).parent("section").toggleClass('active');
			$(e.target).next("p").focus();
		} 
	});
	
})(this._, this.Backbone);