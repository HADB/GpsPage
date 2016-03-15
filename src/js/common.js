$(function () {
    //绘制地图
    function renderMap() {
        var map = new BMap.Map("map-container");
        var point = new BMap.Point(121.47519, 31.228833);
        map.centerAndZoom(point, 16);
        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.NavigationControl({offset: new BMap.Size(15, 70)}));
        map.addControl(new BMap.MapTypeControl({offset: new BMap.Size(15, 70)}));
        map.addControl(new BMap.PanoramaControl({offset: new BMap.Size(15, 100)}));

        var infoWindowOptions = {
            width: 230,     // 信息窗口宽度
            height: 158,     // 信息窗口高度
            title: '<h5 class="title">TY01-883591<i class="fa fa-battery-half pull-right"></i><i class="fa fa-signal pull-right"></i></h5>'
        };
        var $infoWindowContent = $('<div class="info-content"></div>');
        $infoWindowContent.append('<h5><span>状态：</span>静止（1小时24分）</h5>');
        $infoWindowContent.append('<h5><span>定位类型：</span>基站定位</h5>');
        $infoWindowContent.append('<h5><span>信号：</span>2016/03/01 14:50:27</h5>');
        $infoWindowContent.append('<h5><span>定位：</span>2016/03/01 11:41:19</h5>');
        $infoWindowContent.append('<h5><a>街景</a><a>跟踪</a><a>回放</a><a>放大</a></h5>');

        var infoWindow = new BMap.InfoWindow($infoWindowContent.prop('outerHTML'), infoWindowOptions);  // 创建信息窗口对象

        var carIcon = new BMap.Icon("img/car.png", new BMap.Size(50, 26), {
            offset: new BMap.Size(25, 13),
            imageOffset: new BMap.Size(0, 0)
        });
        var marker = new BMap.Marker(point, {icon: carIcon});

        marker.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, point);      // 打开信息窗口
        });
        map.addOverlay(marker);
    }

    renderMap();

    //自定义滚动条样式
    $('.custom-scrollbar').perfectScrollbar({suppressScrollX: true});

    $('.checkbox').click(function () {
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
        }
        else {
            $(this).addClass('checked');
        }
    });

    $('.group-tag').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    $('.user').hover(function () {
        $('.user').removeClass('active');
        $(this).addClass('active');
    });

    $('.guest-list .guest-name,.guest-list .tree-icon').on('click', function () {
        var $guest = $(this).parent();
        $('.guest-list .guest').removeClass('active');
        $guest.addClass('active');
        if ($guest.hasClass('expanded')) {
            $guest.removeClass('expanded');
            $guest.children('.children').slideUp(150, function () {
                $guest.find('.guest').hide();
                $guest.find('.guest').removeClass('expanded');
            });
        }
        else {
            $guest.addClass('expanded');
            $guest.siblings('.guest').removeClass('expanded');
            $guest.siblings('.guest').find('.children').slideUp(150);
            $guest.children('.children').children('.guest').show();
            $guest.children('.children').slideDown(150);
        }
    });

    $('.groups .group-name,.groups .tree-icon').on('click', function () {
        var $group = $(this).parent();
        if ($group.hasClass('expanded')) {
            $group.removeClass('expanded');
            $group.find('.user').removeClass('active');
            $group.find('.users').slideUp(150);
        }
        else {
            $group.addClass('expanded');
            $group.siblings('.group').find('.user').removeClass('active');
            $group.siblings('.group').find('.users').slideUp(150);
            $group.siblings('.group').removeClass('expanded');
            $group.find('.users').slideDown(150);
        }
    });

    $('.search-bar input').focus(function () {
        $(this).siblings('.dropdown').slideDown(150);
        $(this).parent().addClass('active');
    });

    $('.search-bar input').blur(function () {
        $(this).siblings('.dropdown').slideUp(150);
        $(this).parent().removeClass('active');
    });

    $('.search-result').hover(function () {
        $(this).addClass('active');
    });

    $('.search-result').click(function () {
        var result = $(this).html();
        $(this).parents('.search-bar').find('input').val(result);
    });

    $('.add-group-area .add-group-btn').click(function () {
        $('.add-group-area .form-inline').show();
    });

    $('.add-group-area .btn-cancel').click(function () {
        $('.add-group-area .form-inline').hide();
    });

    $('.add-group-area .btn-ok').click(function () {
        $('#message-modal .modal-body').html('添加成功！');
        $('#message-modal').modal();
        $('.add-group-area .form-inline').hide();
    });

    $('.search-device-btn').click(function () {
        $("#device-search-modal").modal();
    });

    $('.search-customer-btn').click(function () {
        $("#customer-search-modal").modal();
    });

    $('.hide-left').click(function () {
        if ($(this).find('i').hasClass('fa-angle-left')) {
            $('.left-area').animate({left: '-300px'}, 100);
            $('.right-area').animate({'padding-left': '15px'}, 100);
            $('.hide-left').animate({'left': '5px'}, 100);
            $('.option-bar-container').animate({'padding-left': '30px'}, 100);
            $(this).find('i').addClass('fa-angle-right');
            $(this).find('i').removeClass('fa-angle-left');
        }
        else {
            $('.left-area').animate({left: '0'}, 100);
            $('.right-area').animate({'padding-left': '320px'}, 100);
            $('.hide-left').animate({'left': '310px'}, 100);
            $('.option-bar-container').animate({'padding-left': '335px'}, 100);
            $(this).find('i').addClass('fa-angle-left');
            $(this).find('i').removeClass('fa-angle-right');
        }
    });
});
