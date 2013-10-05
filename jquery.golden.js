// jQuery Plugin goldenjs 
// Eye candy effect to make text look golden
// by @andrestaltz

(function($) {
  $.goldenjs = function(element, options) {
      var $element = $(element);
      var plugin = this;
      plugin.settings = {};
      var defaults = {
        moving: false
      };
      var _goldDark = "#332A11";
      var _goldMetallic = "#EDBE24";
      var _goldShine = "#FFF63D";

      plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);
        if(!plugin.settings.moving) {
          plugin.elementY = elementY();
        }

        setupShadowElement();
        plugin.update();
        $(window).scroll(plugin.update);
        $element.css('color', _goldDark);
        $element.css('-webkit-background-clip', 'text');
        $element.css('-webkit-text-fill-color', 'transparent');
      };

      plugin.update = function(){
        var _distanceFactor = distanceFactor();
        plugin.updateShadow(_distanceFactor);
        plugin.updateGradient(_distanceFactor);
      };

      plugin.updateShadow = function(factor) {
        var _shadowColor = hexToRGBAString(_goldShine, String(Math.min(1.2-Math.abs(factor), 1.0)));
        var sign = (factor > 0)? '-' : '';
        plugin.$shadowElement.css("text-shadow", "0 "+sign+"2px "+_shadowColor);
      };

      plugin.updateGradient = function(factor) {
        var _firstColor, _secondColor;
        var weakFactor = (factor < 0)? -Math.sqrt(Math.sqrt(-factor)) : Math.sqrt(Math.sqrt(factor));
        if(factor < 0) {
          _firstColor = blend(_goldDark, _goldMetallic, 0.3+(0.7*(1+factor)));
          _secondColor = blend(_goldDark, _goldMetallic, 1+weakFactor);
        }
        else {
          _firstColor = blend(_goldDark, _goldMetallic, 1-weakFactor);
          _secondColor = blend(_goldDark, _goldMetallic, 0.3+(0.7*(1-factor)));
        }
        $element.css('background', '-webkit-linear-gradient('+_firstColor+','+_secondColor+')');
      };

      var setupShadowElement = function() {
        $element.css('position', 'relative');
        $element.css('z-index', '2');
        plugin.shadowElement = document.createElement('div');
        plugin.shadowElement.innerHTML = element.innerHTML;
        plugin.$shadowElement = $(plugin.shadowElement);
        var clonedStyles = ['font-family', 'font-size', 'font-style', 'font-variant', 'font-weight',
          'letter-spacing', 'line-height', 'margin', 'position', 'text-align', 'text-decoration', 
          'text-indent', 'text-rendering', 'vertical-align', 'width' ];
        for(var i=0; i<clonedStyles.length; i++) {
          plugin.$shadowElement.css(clonedStyles[i], $element.css(clonedStyles[i]));
        }
        var top = - $element.css('margin-top').replace("px","") - $element.height();
        plugin.$shadowElement.css('top', top+"px");
        plugin.$shadowElement.css('z-index', '1');
        plugin.$shadowElement.css('color', 'rgba(0,0,0,0)');
        $element.after(plugin.$shadowElement);
      };

      var distanceFactor = function() {
        var _elementY;
        if(plugin.settings.moving) {
          _elementY = plugin.elementY;
        }
        else {
          _elementY = elementY();
        }
        var value = (screenCenterY() - _elementY) / (window.innerHeight>>1);
        value = Math.min(Math.max(value, -1.0), 1.0); // normalize to [-1,+1]
        return value;
      };
      
      var screenCenterY = function() {
        return window.scrollY + (window.innerHeight>>1);
      };
      
      var elementY = function() {
        rect = element.getBoundingClientRect();
        return window.scrollY + rect.top + (rect.height>>1);
      };

      var hexToRGB = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return { 
          r: parseInt(result[1],16), 
          g: parseInt(result[2],16), 
          b: parseInt(result[3],16) 
        };
      };

      var hexToRGBAString = function(hex, alpha) {
        var rgb = hexToRGB(hex);
        return 'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+alpha+')';
      };

      var interpolateIntegers = function(i, j, factor) {
        return String(Math.ceil(i*(1-factor) + j*factor));
      };

      var blend = function(hex1, hex2, factor) {
        var rgb1 = hexToRGB(hex1);
        var rgb2 = hexToRGB(hex2);
        return 'rgb('+
          interpolateIntegers(rgb1.r, rgb2.r, factor) +
          ',' +
          interpolateIntegers(rgb1.g, rgb2.g, factor) +
          ',' +
          interpolateIntegers(rgb1.b, rgb2.b, factor) +
        ')';
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