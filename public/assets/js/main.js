/*
----------------------------
  OBJ COMPONENTS
----------------------------
*/

function RangeSlider(el) {
  this.vars = {
    inputEl: {},
    qtdPoints: 0
  };
  this.init = function() {
    this.setInitialValues();
    this.setPoints();
    this.setListeners();
  };
  this.setInitialValues = function() {
    this.vars.inputEl = $(el).find('.js-range-input');
    var min = Math.abs($(this.vars.inputEl).attr('min'));
    var max = Math.abs($(this.vars.inputEl).attr('max'));
    this.vars.qtdPoints = min + max + 1;
  };
  this.setPoints = function() {
    for (var i = 0; i < this.vars.qtdPoints; i++) {
      if (i == this.vars.qtdPoints -1) {
        $(el).find('.js-range-marks').append('<li></li>');
      } else {
        $(el).find('.js-range-marks').append('<li></li>&nbsp');
      }
    }
  };
  this.setListeners = function() {
    var _this = this;
    $(el).find('input').on('input', function(e) {
      var inputValue = this.value;
      var percent = (100 / (_this.vars.qtdPoints - 1)) * parseInt(Math.abs(this.value));
      var elSpan = $(el).find('.js-range-slider span');
      elSpan.attr('style', '');
      elSpan.css('width', (percent + '%'));
      if (inputValue < 0) {
        elSpan.css('right', '50%');
      } else {
        elSpan.css('left', '50%');
      }
    });
  };

  /* START */
  this.init();
};

/*
----------------------------
  CONTROLLERS
----------------------------
*/

var RatingButton = {
  init: function() {
    RatingButton.setListeners();
  },
  setListeners: function() {
    $('.js-ratingbutton label').click(function(event) {
      $(this).parent().parent().find('li').removeClass('active');
      for (var i = 0; i <= $(this).parent().index(); i++) {
        var el = $(this).parent().parent().children('li')[i];
        $(el).addClass('active');
      }
    });
  }
}

/*
----------------------------
  START FUNCTIONS
----------------------------
*/
$(document).ready(function() {
  RatingButton.init();

  var RangeSlider01 = new RangeSlider($('#RangeSlider01'));
});
