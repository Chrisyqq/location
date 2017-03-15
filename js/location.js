/**
 * Created by chris on 2017/3/13.
 */

var boxTop = $('#locationPlace').offset().top; //图离顶部的位置
var boxLeft = $('#locationPlace').offset().left; //图离最右边的位置
var boxHeight = $('#locationPlace').height();
var boxWidth = $('#locationPlace').width();
var expectX; //点在图标内X的位置
var expectY; //点在图标内Y的位置
var noData; //位置信息状态传输
var smallPlaceData; //图标狂位置信息状态传输
var goBack;


$(document).on('mousedown',".iconfont",function (e){
    var nowThis = $(this);
    expectX = e.pageX - nowThis.offset().left;
    expectY = e.pageY - nowThis.offset().top;

    noData = true;
    //除了标签栏位置
    if((boxLeft<e.pageX  && e.pageY>boxTop+40 && noData==true) || (boxLeft+90 <e.pageX  && e.pageY>boxTop && noData==true)){
        noData = false;//
        smallPlaceData = false;

    }else{
        noData = true;
        smallPlaceData = true;
    }

    nowThis.css({"left":e.pageX - boxLeft - expectX + "px","top":e.pageY - boxTop - expectY + "px"});
    //开始移动 && 靠边平滑处理
    $(document).mousemove(function (e) {
        nowThis.addClass('follow');
        var locationLeft = e.pageX - boxLeft - expectX;
        var locationTop = e.pageY - boxTop - expectY;
        if(-5 <= locationLeft && locationLeft <= (boxWidth - 20)){
            if(0 <= locationTop && locationTop <= (boxHeight - 25)){
                nowThis.css({"left":locationLeft,"top":locationTop});
            }else{
                if(0 > locationTop){
                    nowThis.css({"left":locationLeft,"top":0});
                    $(document).unbind("mousemove");
                }
                if(locationTop > (boxHeight - 25)){
                    nowThis.css({"left":locationLeft,"top":(boxHeight - 25)});
                    $(document).unbind("mousemove");
                }
            }
        }else{
            if(-5 > locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                nowThis.css({"left":-5,"top":locationTop});
                $(document).unbind("mousemove");
            }
            if((boxWidth - 20) < locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                nowThis.css({"left":(boxWidth - 20),"top":locationTop});
                $(document).unbind("mousemove");
            }
        }
        //移动出40*90的小框后自动生成 图标
        if((boxLeft<e.pageX  && e.pageY>boxTop+40 && noData==true) || (boxLeft+90 <e.pageX  && e.pageY>boxTop && noData==true)){
            if(nowThis.hasClass('icon-location')){
                $('#locationBarPlace').append('<i class="iconfont icon-location"></i>');
            }else{
                $('#locationBarPlace').prepend('<i id="technologyVidico" class="iconfont icon-icon-technology-vidicon"></i>');
            }
            noData = false;
            goBack = true;
        }else{
            goBack = false;
        }
        
        $('#input').text(e.pageX+","+e.pageY+","+boxWidth+",");


    });
    //移动结束清除移动
    nowThis.mouseup(function (e) {

        $('#location').removeClass('follow');
        if((boxLeft<e.pageX  && e.pageY>boxTop+40) || (boxLeft+90 <e.pageX  && e.pageY>boxTop)){

        }else{
            if (smallPlaceData==false){
                //删除点位置
                nowThis.remove();
            }else{
                if(goBack == false){
                    nowThis.remove();
                }else{
                    nowThis.removeClass('follow')
                }
            }

        }
        // return moveState;
        //移动出40*90的小框后自动生成 图标
        $(document).unbind("mousemove");
    });
});




