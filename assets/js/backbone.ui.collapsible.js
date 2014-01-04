// Backbone.js Content extension
//
// Initiated by: Lyndel Thomas (@ryndel)
// Source: https://github.com/backbone-ui/collapsible
//
// Licensed under the MIT license:
// http://makesites.org/licenses/MIT

(function(_, Backbone) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;

	var Collapsible = View.extend({

		options: _.extend({}, View.prototype.options, {
			itemEl: "section",
			itemTitle: "h2",
			itemContent: "p",
			maxWidth: "768px"
		}),

		events: {
			"click .ui-collapsible-title": "_collapsible_toggle",
		},

		initialize: function(){
			_.bindAll(this, "_collapsible_toggle");
			// events
				this.on("preRender", this._collapsible_preRender);
				this.on("postRender", this._collapsible_postRender);
			// media query
			mqa.on("devicewidth", _.bind(this._collapsible_calculate));
			return View.prototype.initialize.apply(this, arguments );
		},

		render: function(){
			// add the plugin class in case it is missing
			$(this.el).addClass("ui-collapsible");
			if( isAPP ) return View.prototype.render.apply(this, arguments );
			// by default trigger related events
			this.trigger("preRender");
			this.trigger("postRender");
		},

		_collapsible_preRender: function(){

		},

		_collapsible_postRender: function(){
			// add relevant classes to elements
			$(this.el).find(this.options.itemEl).addClass("ui-collapsible-item");
			$(this.el).find(this.options.itemTitle).addClass("ui-collapsible-title");
			$(this.el).find(this.options.itemContent).addClass("ui-collapsible-content");
			if( !this.options.maxWidth ) $(this.el).addClass("compact");
		},

		_collapsible_toggle: function( e ) {
			//
			$(e.target).closest( this.options.itemEl ).siblings().removeClass("active");
			$(e.target).closest( this.options.itemEl ).toggleClass('active');
			$(e.target).next( this.options.itemContent ).focus();
		},

		_collapsible_calculate: function (enabled) {
			console.log("devicewidth", enabled);
			if( enabled <= this.options.maxWidth ){
				$(this.el).addClass("compact");
			} else {
				$(this.el).removeClass("compact");
			}
		}
	});

	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	Backbone.UI.Collapsible = Collapsible;

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Collapsible;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			//define( "backbone.ui.scrollchange", [], function () { return Collapsible; } );
			//define( ['jquery', 'underscore', 'backbone'], function () { return Collapsible; } );
			define( [], function () { return Collapsible; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Backbone = Backbone;
		// update APP namespace
		if( typeof APP != "undefined" && (_.isUndefined( APP.UI ) || _.isUndefined( APP.UI.Collapsible ) ) ){
			APP.UI = APP.UI || {};
			APP.UI.Collapsible = Backbone.UI.Collapsible;
			window.APP = APP;
		}
	}


})(this._, this.Backbone);