// jQuery Plugin goldenjs 
// Eye candy effect to make text look golden
// by @andrestaltz

(function($) {
  $.goldenjs = function(element, options) {
      var $element = $(element);  // reference to the jQuery version of DOM element the plugin is attached to
      var plugin = this;
      plugin.settings = {};
      var defaults = {
        moving: false
      };
      var _goldDark = "#3B331B";
      var _goldMetallic = "#D4AF37";
      var _goldShine = "rgba(255,242,0,1)";

      plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);
        if(!plugin.settings.moving) {
          plugin.elementY = elementY();
        }

        $(window).scroll(plugin.update);
        plugin.update();
      };

      plugin.update = function(){
        var _distanceFactor = distanceFactor();
        if(_distanceFactor < 0) {
          $element.css("color", _goldDark);
          var shadowColor = _goldShine.replace(/[^,]*(?=\)$)/,String(1.2+_distanceFactor));
          console.log("0 1px "+shadowColor);
          $element.css("text-shadow", "0 1px "+shadowColor);
        }
      };

      // a public method
      plugin.foo_public_method = function() {
        // code goes here
      };

      // private methods
      var distanceFactor = function() {
        var _elementY;
        if(plugin.settings.moving) {
          _elementY = plugin.elementY;
        }
        else {
          _elementY = elementY();
        }
        var value = (screenCenterY() - _elementY) / (window.innerHeight>>1);
        value = (value < -1.0)? -1.0 : value;
        value = (value > 1.0)? 1.0 : value;
        return value;
      };
      var screenCenterY = function() {
        return window.scrollY + (window.innerHeight>>1);
      };
      var elementY = function() {
        rect = element.getBoundingClientRect();
        return window.scrollY + rect.top + (rect.height>>1);
      };
      var colorLuminance = function(hex, lum) {
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
          hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
          c = parseInt(hex.substr(i*2,2), 16);
          c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
          rgb += ("00"+c).substr(c.length);
        }
        return rgb;
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