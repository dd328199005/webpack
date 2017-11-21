define(function(){
    function scrollTop($node) {
        this.$ct = $('body')
        this.target = $node
        this.bindEvent()
    };
    scrollTop.prototype = {
        bindEvent: function () {
            var _this = this
            var isCreate = false
            $(window).scroll(function () {
                if ($(window).scrollTop() > 100 && !isCreate) {
                    isCreate = true
                    _this.createNode()
                } else if ($(window).scrollTop() <= 100 && isCreate) {
                    isCreate = false
                    _this.target.fadeOut(300)
                }
            })
        },

        createNode: function () {
            this.target = $('<div class="totop">返回</div>')
            this.target.css({
                cursor: 'pointer',
                position: 'fixed',
                right: '40px',
                bottom: '40px',
                backgroundColor: '#444',
                color: 'white',
                height: '60px',
                width: '60px',
                borderRadius: '30px',
                lineHeight: '60px',
                textAlign: 'center',
                display: 'none'
            })
            this.$ct.append(this.target)
            this.target.fadeIn(300)
            this.bindNode(this.target)
        },
        bindNode: function ($noded) {
            $noded.click(function () {
                //    $(window).scrollTop(0)
                var timer
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(function fn() {
                    var oTop = $(window).scrollTop()
                    if (oTop > 0) {
                        $(window).scrollTop(oTop - 150)
                        timer = requestAnimationFrame(fn);
                    } else {
                        cancelAnimationFrame(timer);
                    }
                })
            })
        }
    };



    return scrollTop;
})