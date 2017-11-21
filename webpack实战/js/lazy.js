define(function(){
    return function(){
        var colNum = parseInt($('#pic-ct').width() / $('.item').outerWidth(true));
        var colSumHeight = [];
        var curPage = 1;
        var perPageCount = 10;
        var nodeWidth = $('.item').outerWidth(true);
        for (var i = 0; i < colNum; i++) {
            colSumHeight[i] = 0
        }
        // console.log(colSumHeight)

        start()
        function start() {
            getData(function (newsList) {
                console.log(newsList)
                $.each(newsList, function (idx, news) {
                    var $node = getNode(news)
                    $node.find('img').on('load', function () {
                        $('#pic-ct').append($node)
                        // console.log($node,'load...')
                        waterFallPlace($node)
                    })
                })
            })
        }
        var clock
        $(window).scroll(function () {
            if (clock !== undefined) {
                clearTimeout(clock)
            }
            clock = setTimeout(function () {
                if (isVisible($('.loadMore'))) {
                    start()
                }
            }, 300);

        })



        function isVisible($el) {
            var scrollH = $(window).scrollTop(),
                winH = $(window).height(),
                top = $el.offset().top
            console.log(top)

            if (top < winH + scrollH + 200) {
                return true
            } else {
                return false
            }
        }



        function getData(callBack) {
            $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                data: {
                    app_key: '1271687855',
                    num: perPageCount,
                    page: curPage
                }
            }).done(function (ret) {
                if (ret && ret.status && ret.status.code === '0') {
                    callBack(ret.data)
                    curPage++
                } else {
                    console.log('get error data')
                }
            })
        }

        function getNode(item) {
            var html = ''
            html += '<li class="item">'
            html += '<a href="' + item.url + '"><img src="' + item.img_url + '" alt=""></a>'
            html += '<h3>' + item.name + '</h3>'
            html += '<p>' + item.short_intro + '</p>'
            html + '</li>';
            return $(html)//返回此节点
        }



        function waterFallPlace($node) {
            var idx = 0,
                minSumHeight = colSumHeight[0];
          
            for (var i = 0; i < colSumHeight.length; i++) {
                if (colSumHeight[i] < minSumHeight) {
                    idx = i;
                    minSumHeight = colSumHeight[i];
                }
            }
            console.log(nodeWidth)
            // var minValue = Math.min.apply(null, itemArr)
            // var minIndex = itemArr.indexOf(minValue)
            $node.css({
                top: minSumHeight,
                left: nodeWidth * idx,
                opacity: 1
            });
            // console.log($node)

            colSumHeight[idx] += $node.outerHeight(true)
            $('#pic-ct').height(Math.max.apply(null, colSumHeight));
        }
    }
    

// })

})
