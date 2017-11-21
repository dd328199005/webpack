var Carousel = require('../js/carousel.js')
var scrollTop = require('../js/gotop.js')
var lazy = require('../js/lazy.js')
// var $ = require('jquery');

new scrollTop($('body'))
new Carousel($('.carousel'))
lazy()