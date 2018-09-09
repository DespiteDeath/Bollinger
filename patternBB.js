// helpers
var _ = require('lodash');
var log = require('../core/log.js');

var method = {};

// Prepare everything our method needs
method.init = function() {

var customBBandsSettings = {
  optInTimePeriod: 20;
  optInNbStdDevs: 2;
}

  // add the indicator to the strategy
  this.addTulipIndicator('mybbands', 'bbands', customBBandsSettings);
}


// What happens on every new candle?
method.update = function(candle) {
  // nothing!
}


method.log = function() {
  // nothing!
}

// Based on the newly calculated information, check if we should update or not.
method.check = function(candle) {
  var price = candle.close;
  var result = this.tulipIndicators.mymacd.result;
  var macddiff = result['macd'] - result['macdSignal'];

  if(this.settings.thresholds.down > macddiff && this.trend !== 'short') {
    this.trend = 'short';
    this.advice('short');

  } else if(this.settings.thresholds.up < macddiff && this.trend !== 'long'){
    this.trend = 'long';
    this.advice('long');

  }
}

module.exports = method;
