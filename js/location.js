/**
 * Created by chris on 2017/3/13.
 */
var expectY = $('#locationPlace').offset().top;
var expectX = $('#locationPlace').offset().left;
$(document).mousemove(function (e) {
    $('#input').text(e.pageX+","+e.pageY+expectY);
    var locationLeft = e.pageX - expectX;
    var locationTop = e.pageY - expectY;
    $('#location').css({"left":locationLeft,"top":locationTop})
});
$('#location').mousedown(function (e) {
    alert(e.clientTop())

    $('#location').addClass('follow');

});