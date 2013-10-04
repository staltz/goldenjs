(function($) {
  $.fn.golden = function() {

      return this.filter( "a" ).append(function() {
          return " (" + this.href + ")";
      });

  };
}(jQuery));