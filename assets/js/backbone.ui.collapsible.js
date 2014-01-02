// Backbone.js Content extension
//
// Initiated by: Lyndel Thomas (@ryndel)
// Source: https://github.com/backbone-ui/collapsible
//
// Licensed under the MIT license:
// http://makesites.org/licenses/MIT

(function(_, Backbone) {

	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	// Support backbone app (if available)
	var View = ( typeof APP != "undefined" && typeof APP.View != "undefined" ) ? APP.View : Backbone.View;

	Backbone.UI.Collapsible = View.extend({

		options: _.extend({}, View.prototype.options, {
			itemEl: "section",
			itemTitle: "h2",
			itemContent: "p"
		}),

		events: {
			"click h2": "_collapsible_toggle",
		},

		initialize: function(){
			_.bindAll(this, "_collapsible_toggle");
			// events
				this.on("preRender", this._collapsible_preRender);
				this.on("postRender", this._collapsible_postRender);
			//
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
		},

		_collapsible_toggle: function( e ) {
			$(e.target).parent( this.options.itemEl ).siblings().removeClass("active");
			$(e.target).parent( this.options.itemEl ).toggleClass('active');
			$(e.target).next( this.options.itemContent ).focus();
		}
	});

})(this._, this.Backbone);