$(function () {
    $('.custom-scrollbar').perfectScrollbar();
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
    })
});
