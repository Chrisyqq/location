/**
 * Created by chris on 2017/3/13.
 */

var boxTop = $('#locationPlace').offset().top; //图离顶部的位置
var boxLeft = $('#locationPlace').offset().left; //图离最右边的位置
var boxHeight = $('#locationPlace').height();
var boxWidth = $('#locationPlace').width();
var expectX; //点在图标内X的位置
var expectY; //点在图标内Y的位置

$('#location').mousedown(function (e) {
    var noThis = this;
    expectX = e.pageX - $('#location').offset().left;
    expectY = e.pageY - $('#location').offset().top;

    $('#location').addClass('follow');
    $('#location').css({"left":e.pageX - boxLeft - expectX + "px","top":e.pageY - boxTop - expectY + "px"});
    //开始移动 && 靠边平滑处理
    $(document).mousemove(function (e) {

        var locationLeft = e.pageX - boxLeft - expectX;
        var locationTop = e.pageY - boxTop - expectY;
        if(-5 <= locationLeft && locationLeft <= (boxWidth - 20)){
            if(0 <= locationTop && locationTop <= (boxHeight - 25)){
                $('#location').css({"left":locationLeft,"top":locationTop});
            }else{
                if(0 > locationTop){
                    $('#location').css({"left":locationLeft,"top":0});
                }
                if(locationTop > (boxHeight - 25)){
                    $('#location').css({"left":locationLeft,"top":(boxHeight - 25)});
                }
            }
        }else{
            if(-5 > locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                $('#location').css({"left":-5,"top":locationTop});
            }
            if((boxWidth - 20) < locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                $('#location').css({"left":(boxWidth - 20),"top":locationTop});
            }
        }



        //移动出40*90的小框后自动生成 图标
        if(boxLeft+90<e.pageX || e.pageY>boxTop+40){
            if($('#locationBarPlace').find('i').length<3){
                $('#locationBarPlace').append('<i class="iconfont icon-location"></i>')
            }
        }else{
            $('#locationBarPlace').find('i').eq(2).remove();

        }
        $('#input').text(e.pageX+","+e.pageY+","+boxWidth+",");

    });
    //移动结束清除移动
    $(document).mouseup(function (e) {
        noThis.removeAttr('id');
        $(document).unbind("mousemove");

        // $('#location').removeClass('follow');

        // return moveState;
        //移动出40*90的小框后自动生成 图标
        if(boxLeft+90<e.pageX || e.pageY>boxTop+40){
            if($('#locationBarPlace').find('i').length<3){
                $('#locationBarPlace').append('<i id="location" class="iconfont icon-location"></i>')
            }
        }else{
            $('#location').removeClass('follow');
        }
    });
});
$("#locationBarPlace").bind('DOMNodeInserted', function(e) {
    console.log($(e.target).html());
});