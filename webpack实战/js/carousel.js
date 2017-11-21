define(function () {
    function Carousel($ct) {
        this.$ct = $ct
        this.init();
        this.bind();

    }

    Carousel.prototype.init = function () {
        var $imgs = this.$imgs = this.$ct.find('.pic li')
        var $imgCt = this.$imgCt = this.$ct.find('.pic')
        var $imgCount = this.$imgCount = $imgs.length
        var $imgWitdh = this.$imgWitdh = $imgs.width()
        var $nextBtn = this.$nextBtn = this.$ct.find('.next')
        var $prevBtn = this.$prevBtn = this.$ct.find('.pre')
        var $bullets = this.$bullets = this.$ct.find('.bullet li')
        this.$btn = this.$ct.children('a')
        // console.log(this.$btn)
        $imgCt.append($imgs.first().clone())
        $imgCt.prepend($imgs.last().clone())
        $imgCt.width(($imgCount + 2) * $imgWitdh)
        $imgCt.css({ left: -$imgWitdh })

        var page = this.page = 0
        var isAnimate = this.isAnimate = false

    }


    Carousel.prototype.bind = function () {
        var _this = this
        this.$ct.on('mouseover',this.$btn,function(){
            _this.$btn.show()
        })
        this.$ct.on('mouseout',this.$btn,function(){
            _this.$btn.hide()
        })
        this.$nextBtn.click(function (e) {
            e.preventDefault();
            if (_this.isAnimate) {
                return
            }
            _this.isAnimate = true
            _this.playNext(1)
        })
        this.$prevBtn.click(function (e) {
            e.preventDefault();
            if (_this.isAnimate) {
                return
            }
            _this.isAnimate = true
            _this.playPrev(1)
        })
        this.$bullets.click(function () {
            var idx = $(this).index()
            if (_this.page > idx) {
                _this.playPrev(_this.page - idx)
            } else {
                _this.playNext(idx - _this.page)
            }
        })

    }

    Carousel.prototype.playNext = function (len) {
        var _this = this
        this.$imgCt.animate({ left: '-=' + len * _this.$imgWitdh }, 300, 'swing', function () {//写在里面和写在外面位置上有区别,时机问题
            _this.page += len
            if (_this.page === _this.$imgCount) {
                _this.page = 0
                _this.$imgCt.css({ left: -_this.$imgWitdh })
            }
            console.log(new Date, '0')
            _this.setBullet()
            _this.isAnimate = false
        })
        //    setBullet()
        console.log(new Date, '1')

    }
    Carousel.prototype.playPrev = function (len) {
        var _this = this
        console.log(this.page)
        this.$imgCt.animate({ left: '+=' + len * _this.$imgWitdh }, 300, 'swing', function () {
            _this.page -= len
            if (_this.page < 0) {
                _this.page = _this.$imgCount - 1
                //    console.log(2)
                _this.$imgCt.css({ left: -_this.$imgWitdh * _this.$imgCount })
            }
            _this.setBullet()
            _this.isAnimate = false
        })

    }
    Carousel.prototype.setBullet = function () {
        this.$bullets.removeClass('active')
            .eq(this.page).addClass('active')

    }
    return Carousel
})