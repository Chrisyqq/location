/**
 * Created by chris on 2017/3/13.
 */

var boxTop = $('#locationPlace').offset().top; //图离顶部的位置
var boxLeft = $('#locationPlace').offset().left; //图离最右边的位置
var boxHeight = $('#locationPlace').height();
var boxWidth = $('#locationPlace').width();
var expectX; //点在图标内X的位置
var expectY; //点在图标内Y的位置
var noData; //移动过程中 添加事件一直执行  创造此数据 为了移动的时候只执行一次
var smallPlaceData; //图标狂位置信息状态传输
var goBack = 1;
var idLocation = 1;
var idVidicon = 1;
var pointData;


$(document).on('mousedown',".iconfont",function (e){
    $('.right-information').css({'display':'block'});
    if(e.which==1){
        var nowThis = $(this);

        goBack = 1;
        expectX = e.pageX - nowThis.offset().left;
        expectY = e.pageY - nowThis.offset().top;
        noData = true;

        //实时显示位置信息
        $('#input').find('input').eq(0).attr('value',nowThis.css('left'));
        $('#input').find('input').eq(1).attr('value',nowThis.css('top'));
        $('#input').find('input').eq(2).attr('value',nowThis.attr('name'));
        //除了标签栏位置
        if((boxLeft<e.pageX  && e.pageY>boxTop+40 && noData==true) || (boxLeft+60 <e.pageX  && e.pageY>boxTop && noData==true)){
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

            //case: 为移动出去又回到图标框 增加识别标签 goBack
            if((boxLeft<e.pageX  && e.pageY>boxTop+40) || (boxLeft+60 <e.pageX  && e.pageY>boxTop)){
                goBack = goBack + 1;
            }else{

            }

            if(-5 <= locationLeft && locationLeft <= (boxWidth - 20)){ //
                if(0 <= locationTop && locationTop <= (boxHeight - 25)){
                    nowThis.css({"left":locationLeft,"top":locationTop});
                }else{
                    if(0 > locationTop){
                        nowThis.css({"left":locationLeft,"top":0});
                    }
                    if(locationTop > (boxHeight - 25)){
                        nowThis.css({"left":locationLeft,"top":(boxHeight - 25)});
                    }
                    //
                    $(document).unbind("mousemove");
                    if(goBack>1){
                        nowThis.remove();
                    }else{
                        nowThis.removeClass('follow');
                    }
                }
            }else{
                if(-5 > locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                    nowThis.css({"left":-5,"top":locationTop});
                }
                if((boxWidth - 20) < locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                    nowThis.css({"left":(boxWidth - 20),"top":locationTop});
                }
                $(document).unbind("mousemove");
                if(goBack>1){
                    nowThis.remove();
                }else{
                    nowThis.removeClass('follow');
                }
            }

            //移动出40*90的小框后自动生成 图标
            if((boxLeft<e.pageX  && e.pageY>boxTop+40 && noData==true) || (boxLeft+60 <e.pageX  && e.pageY>boxTop && noData==true)){
                if(nowThis.hasClass('icon-location')){
                    idLocation = idLocation+1;
                    $('#locationBarPlace').append('<i name="'+ "location" + idLocation +'" class="iconfont icon-location"></i>');
                    noData = false;
                }else{
                    idVidicon = idVidicon+1;
                    $('#locationBarPlace').prepend('<i name="'+ "vidicon" + idVidicon +'" class="iconfont icon-icon-technology-vidicon"></i>');
                    noData = false;
                }
            }else{

            }

            nowThis.attr('x',nowThis.css('left'));
            nowThis.attr('y',nowThis.css('left'));
            $('#input').find('input').eq(2).attr('value',nowThis.attr('name'));

            //实时显示位置信息
            $('#input').find('input').eq(0).attr('value',nowThis.css('left'));
            $('#input').find('input').eq(1).attr('value',nowThis.css('top'));
            $('#input').find('input').eq(2).attr('value',nowThis.attr('name'));

        });
        //移动结束清除移动
        nowThis.mouseup(function (e) {
            if((boxLeft<e.pageX  && e.pageY>boxTop+40) || (boxLeft+60 <e.pageX  && e.pageY>boxTop)){

            }else{
                if (smallPlaceData==false){
                    //删除点位置
                    nowThis.remove();
                }else{
                    if(goBack > 1){
                        //删除点位置 移动出之后再回来
                        nowThis.remove();
                    }else{
                        // nowThis.remove();
                        nowThis.removeClass('follow')
                    }

                }

            }
            $(document).unbind("mousemove");
            goBack = 1;
        });
    }

});
//鼠标右键屏蔽
$('#locationPlace').on('contextmenu',function(e){
    e.preventDefault();
});

$('#locationPlace').on('mousedown',function(e){
    $('.follow-message').css({'display':'none'});
    e.preventDefault();
});
$(document).on('mousedown',".follow",function (e){
    $('.follow-message').css({'display':'none'});
    if(e.which==3){
        var x=parseInt($(this).css('left').substring(0,$(this).css('left').length-2))+40+"px";
        var y=parseInt($(this).css('top').substring(0,$(this).css('top').length-2))-40+"px";
        console.log(x,y)
        $('.follow-message').html('<p>'+$(this).attr('x')+'</p><p>'+$(this).attr('y')+'</p><p>'+$(this).attr('name')+'</p><div class="follow-message-left"></div>');
        $('.follow-message').css({'left': x,'top': y,'display':'block'});
        $('.follow-message').animate({
            left:'+=10px',
            display:'block'
        });
        $('.right-information').css({'display':'block'});
        e.preventDefault();
    }
});


