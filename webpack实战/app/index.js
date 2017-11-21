require(['gotop','carousel','lazy'],function(scrollTop,Carousel,lazy){
    new scrollTop($('body'))
    new Carousel($('.carousel'))
    lazy()
})