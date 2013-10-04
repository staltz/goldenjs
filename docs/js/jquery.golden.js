// jQuery Plugin goldenjs 
// Eye candy effect to make text look golden
// by @andrestaltz

(function($) {
  $.goldenjs = function(element, options) {
      var $element = $(element);  // reference to the jQuery version of DOM element the plugin is attached to
      var plugin = this;
      plugin.settings = {};
      var defaults = {
        moving: false,
        // if your plugin is event-driven, you may provide callback capabilities for its events.
        // execute these functions before or after events of your plugin, so that users may customize
        // those particular events without changing the plugin's code
        onFoo: function() {}
      };

      plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);

        $(window).scroll(function(){
          console.log(screenCenterY()+"   "+elementY());
        });
        // code goes here
      };

      // a public method
      plugin.foo_public_method = function() {
        // code goes here
      };

      // private methods
      var screenCenterY = function() {
        return window.scrollY + (window.innerHeight>>1);
      };
      var elementY = function() {
        rect = element.getBoundingClientRect();
        return window.scrollY + rect.top + (rect.height>>1);
      };

      plugin.init();
  };

  $.fn.goldenjs = function(options) {
    return this.each(function() {
      if(undefined === $(this).data('goldenjs')) {
        var plugin = new $.goldenjs(this, options);
        $(this).data('goldenjs', plugin);
      }
    });
  };
})(jQuery);