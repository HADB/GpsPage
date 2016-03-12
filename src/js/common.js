$(function () {
    $('.custom-scrollbar').perfectScrollbar({suppressScrollX: true});
    var map = new BMap.Map("map-container");
    var point = new BMap.Point(121.47519, 31.228833);
    map.centerAndZoom(point, 16);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl({offset: new BMap.Size(15, 70)}));
    map.addControl(new BMap.MapTypeControl({offset: new BMap.Size(15, 70)}));
    map.addControl(new BMap.PanoramaControl({offset: new BMap.Size(15, 100)}));

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

    $('.group-name').click(function () {
        var $group = $(this).parent();
        if ($group.hasClass('expanded')) {
            $group.find('.user').removeClass('active');
            $group.find('.users').slideUp();
            $group.removeClass('expanded');
        }
        else {
            $group.siblings('.group').find('.user').removeClass('active');
            $group.siblings('.group').find('.users').slideUp();
            $group.siblings('.group').removeClass('expanded');
            $group.addClass('expanded');
            $group.find('.users').slideDown();
        }
    });
});
