$(function () {
    //绘制地图
    function renderMap(signal, showBubbleTitle) {
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
            title: '<h5 class="title">TY01-883591 <div class="top pull-right"></div><div class="power pull-right"><div class="power-value"></div></div><span class="pull-right signal ' + signal + '">&nbsp;</span></h5>'
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
            var power = getUrlParam("battery");
            $(".power-value").css("width", power + "%");
            $(".BMap_bubble_title").css("white-space", "normal")
        });
        map.addOverlay(marker);

        if (showBubbleTitle) {
            var bubbleLabel = new BMap.Label("TY01-883591", {
                position: point,
                offset: new BMap.Size(18, -30)
            });
            bubbleLabel.setStyle({
                color: "black",
                fontSize: "12px",
                lineHeight: "20px",
                fontFamily: "微软雅黑"
            });
            map.addOverlay(bubbleLabel);
        }
    }

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

    $('.user').mouseenter(function (event) {
        console.log($(event.target).hasClass('active'));
        if (!$(event.target).hasClass('user.active')) {
            $('.popup-menu').hide();
        }
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
            $guest.children('.children').slideDown(150, function () {
                $('.custom-scrollbar').perfectScrollbar('update');
            });
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
            $group.find('.users').slideDown(150, function () {
                $('.custom-scrollbar').perfectScrollbar('update');
            });
        }
    });

    $('.groups .group').mouseenter(function (event) {
        $(event.target).closest('.group').find('.group-actions').addClass('active');
    });

    $('.groups .group').mouseleave(function (event) {
        $(event.target).closest('.group').find('.group-actions').removeClass('active');
    });

    $('.groups .group .group-actions .delete').click(function () {
        $(this).closest('.group').slideUp(150, function () {
            $('#message-modal .modal-body').html('删除成功！');
            $('#message-modal').modal();
        });
    });

    $('.groups .group .group-actions .edit').click(function () {
        var $group = $(this).closest('.group');
        $group.find('.group-name').hide();
        $group.find('.group-name-edit').show();
        $group.find('.group-actions .edit').hide();
        $group.find('.group-actions .delete').hide();
        $group.find('.group-actions .save').show();
        $group.find('.group-actions .cancel').show();
    });

    $('.groups .group .group-actions .save').click(function () {
        var $group = $(this).closest('.group');
        var newName = $group.find('.group-name-edit').val();
        $group.find('.group-name').html(newName).show();
        $group.find('.group-name-edit').hide();
        $group.find('.group-actions .edit').show();
        $group.find('.group-actions .delete').show();
        $group.find('.group-actions .save').hide();
        $group.find('.group-actions .cancel').hide();
    });

    $('.groups .group .group-actions .cancel').click(function () {
        var $group = $(this).closest('.group');
        $group.find('.group-name').show();
        $group.find('.group-name-edit').hide();
        $group.find('.group-actions .edit').show();
        $group.find('.group-actions .delete').show();
        $group.find('.group-actions .save').hide();
        $group.find('.group-actions .cancel').hide();
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

    $('#customer-search-modal .nav-tabs li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('customer-relationship')) {
            $('#customer-search-modal .panel').hide();
            $('#customer-search-modal .customer-relationship').show();
        }
        if ($(this).hasClass('customer-details')) {
            $('#customer-search-modal .panel').hide();
            $('#customer-search-modal .customer-details').show();
        }
    });

    $('#device-search-modal .nav-tabs li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('customer-relationship')) {
            $('#device-search-modal .panel').hide();
            $('#device-search-modal .customer-relationship').show();
            $('#device-search-modal .customer-relationship .panel').show();
        } else if ($(this).hasClass('transfer')) {
            $('#device-search-modal .panel').hide();
            $('#device-search-modal .transfer').show();
        } else if ($(this).hasClass('device-details')) {
            $('#device-search-modal .panel').hide();
            $('#device-search-modal .device-details').show();
        }
    });

    $('.hide-left').click(function () {
        var $table = $('.bottom-box table');
        if ($(this).find('i').hasClass('fa-angle-left')) {
            $('.left-area').animate({left: '-300px'}, 100);
            $('.right-area').animate({'padding-left': '15px'}, 100);
            $('.hide-left').animate({'left': '5px'}, 100);
            $('.option-bar-container').animate({'padding-left': '30px'}, 100);
            $(this).find('i').addClass('fa-angle-right');
            $(this).find('i').removeClass('fa-angle-left');
            $('.bottom-box .panel-body').scrollTop(0);
            $table.floatThead('destroy');
            $('.bottom-box').animate({'padding-left': '10px'}, 100);
        }
        else {
            $('.left-area').animate({left: '0'}, 100);
            $('.right-area').animate({'padding-left': '285px'}, 100);
            $('.hide-left').animate({'left': '275px'}, 100);
            $('.option-bar-container').animate({'padding-left': '300px'}, 100);
            $(this).find('i').addClass('fa-angle-left');
            $(this).find('i').removeClass('fa-angle-right');
            $('.bottom-box').animate({'padding-left': '285px'}, 100, 'swing', function () {
                $('.bottom-box .panel-body').scrollTop(0);
                $table.floatThead();
            });
        }
    });

    $('.map-selection').click(function () {
        $(this).find('.dropdown-menu').slideToggle(150);
    });

    $('.map-selection li').click(function () {
        $('.map-selection span').html($(this).find('a').html());
    });

    var $table = $('.bottom-box table');
    $('.bottom-box-toggle-btn').click(function () {
        if ($(this).hasClass('fa-chevron-circle-down')) {
            $('.bottom-box .panel-body').scrollTop(0);
            $table.floatThead('destroy');
            $(this).removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
            $('.bottom-box').animate({'height': '35px'}, 100);

        }
        else {
            $(this).removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
            $('.bottom-box').animate({'height': '205px'}, 100, 'swing', function () {
                $('.bottom-box .panel-body').css('height', '168px');
                $('.bottom-box .panel-body').scrollTop(0);
                $table.floatThead();
            });
        }
    });

    interact('.main .right-area .bottom-box').resizable({
        preserveAspectRatio: true,
        edges: {left: true, right: true, bottom: true, top: true}
    }).on('resizestart', function () {
        $('.bottom-box .panel-body').scrollTop(0);
        $table.floatThead('destroy');
    }).on('resizemove', function (event) {
        var target = event.target;
        var y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.height = event.rect.height + 'px';

        $(target).find('.panel-body').css('height', event.rect.height - 32);

        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translateY(y' + 'px)';

        target.setAttribute('data-y', y);
    }).on('resizeend', function () {
        $('.bottom-box .panel-body').scrollTop(0);
        $table.floatThead();
    });

    $('.func-btns .more').click(function (event) {
        console.log(event);
        var $popupMenu = $('.operation-popup-menu');
        $popupMenu.css('left', event.clientX);
        $popupMenu.css('top', event.clientY - 130);
        $popupMenu.show();
    });

    $(".full-screen").click(function () {
        var $this = $(this);
        if ($this.hasClass('checked')) {
            $(".header").hide();
            $(".navbar").hide();
            $(".main").css("padding-top", "0");
            var $hideLeftAreaButton = $(".hide-left");
            if ($hideLeftAreaButton.find('i').hasClass('fa-angle-left')) {
                $hideLeftAreaButton.click();
            }
            $(".bottom-box").hide();
            //renderMap();
        } else {
            $(".main").css("padding-top", "130px");
            $(".header").show();
            $(".navbar").show();
            $(".bottom-box").show();
        }
    });

    $("#move-to-group").click(function (event) {
        var $popupMenu = $('.group-popup-menu');
        $popupMenu.css('left', event.clientX);
        $popupMenu.css('top', event.clientY - 130);
        $popupMenu.show();
    });

    $("body").on("contextmenu", ".root-guest", function (e) {
        $("#contextMenu").css({
            display: "block",
            left: e.pageX,
            top: e.pageY
        });

        console.log(e.pageX, e.pageY);
        return false;
    });

    $("#contextMenu").on("click", "a", function () {
        $("#contextMenu").hide();
    });

    $("#column-modal").on("click", "td", function () {
        var $this = $(this);
        $this.parent('tr').siblings('tr').find('td').removeClass('selected');
        $this.toggleClass('selected');
    });

    $("#column-operation-buttons").find("p").click(function () {
        var $hiddenColumnsTable = $("#hidden-columns-table");
        var $shownColumnsTable = $("#shown-columns-table");

        var operation = $(this).data("operation");
        switch (operation) {
            case "column-to-right":
                $hiddenColumnsTable.find("td.selected").each(function () {
                    if ($(this).text() !== "") {
                        $shownColumnsTable.find("tbody").prepend('<tr><td>' + $(this).text() + '</td></tr>');
                        $(this).remove();
                    }
                });
                break;
            case "column-to-left":
                $shownColumnsTable.find("td.selected").each(function () {
                    if ($(this).text() !== "") {
                        $hiddenColumnsTable.find("tbody").prepend('<tr><td>' + $(this).text() + '</td></tr>');
                        $(this).remove();
                    }
                });
                break;
            case "all-to-right-button":
                $hiddenColumnsTable.find("td").each(function () {
                    if ($(this).text() !== "") {
                        $shownColumnsTable.find("tbody").prepend('<tr><td>' + $(this).text() + '</td></tr>');
                        $(this).remove();
                    }
                });
                break;
            case "all-to-left-button":
                $shownColumnsTable.find("td").each(function () {
                    if ($(this).text() !== "") {
                        $hiddenColumnsTable.find("tbody").prepend('<tr><td>' + $(this).text() + '</td></tr>');
                        $(this).remove();
                    }
                });
                break;
        }
    });

    $("#contact-us").click(function (event) {
        $(this).hide();
        $(".contact-info").css({display: "inline-block"});
    });

    $("body").click(function (event) {
        if (!$(event.target).is("#contact-us")) {
            $(".contact-info").css({display: "none"});
            $("#contact-us").show();
        }
    });

    $(document).on("click", "a.unread", function () {
        $(this).parents("tr").removeClass('danger');
        $(this).text("已读").removeClass('unread').addClass('readed');
    });

    $(document).on("click", "a.unlock", function () {
        $(this).parents("tr").remove();
    });

    $('body').on('click', '.select2-results__option .select2-results__group', function () {
        $(this).siblings().slideToggle(150);
        $('.select2-container--open .select2-selection__rendered').html($(this).html());
    });

    $("#alarm").click(function () {
        if (!$(this).hasClass('checked')) {
            var audio = new Audio('audio/alarm.wav');
            audio.play();
        }
    });

    $(".device-name").click(function () {
        if ($(this).hasClass('checked')) {
            renderMap("signal0", true);
        } else {
            renderMap("signal0", false);
        }
    });

    var height = $('body').height();
    $('.left-area').height(height - 140);
    $('.modal-dialog').css('margin-top', (height - 658) / 2);
    $(document).ready(function () {
        var signal = getUrlParam("signal");
        if (!signal) {
            signal = 4;
        }

        renderMap("signal" + signal, false);

        $("#search-customer1").select2();
        $("#search-customer2").select2();

        jeDate.skin("gray");
        jeDate({
            dateCell: ".datepicker-control",
            format: "YYYY年MM月DD日 hh:mm:ss",
            isinitVal: true,
            isTime: true,
            zIndex: 9999
        });
    });

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
});
