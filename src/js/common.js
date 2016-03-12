$(function () {
    var map = new BMap.Map("map-container");
    var point = new BMap.Point(121.47519, 31.228833);
    map.centerAndZoom(point, 16);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl({offset: new BMap.Size(15, 70)}));
    map.addControl(new BMap.MapTypeControl({offset: new BMap.Size(15, 70)}));
    map.addControl(new BMap.PanoramaControl({offset: new BMap.Size(15, 100)}));

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

    $('.guest-name').click(function () {
        var $guest = $(this).parent();
        $('.guest-list .guest').removeClass('active');
        $guest.addClass('active');
        if ($guest.hasClass('expanded')) {
            $guest.removeClass('expanded');
            $guest.children('.children').slideUp(500, function () {
                $guest.find('.guest').hide();
                $guest.find('.guest').removeClass('expanded');
            });
        }
        else {
            $guest.addClass('expanded');
            $guest.siblings('.guest').removeClass('expanded');
            $guest.siblings('.guest').find('.children').slideUp(500);
            $guest.children('.children').children('.guest').show();
            $guest.children('.children').slideDown(500);
        }
    });

    $('.group-name').click(function () {
        var $group = $(this).parent();
        if ($group.hasClass('expanded')) {
            $group.removeClass('expanded');
            $group.find('.user').removeClass('active');
            $group.find('.users').slideUp(500);
        }
        else {
            $group.addClass('expanded');
            $group.siblings('.group').find('.user').removeClass('active');
            $group.siblings('.group').find('.users').slideUp(500);
            $group.siblings('.group').removeClass('expanded');
            $group.find('.users').slideDown(500);
        }
    });
});
