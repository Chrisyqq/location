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
var pointData = [{name:'0',x:'50px',y:'50px',style:'vidicon',circlearea:'100'},{name:'1',x:'80px',y:'80px',style:'location',circlearea:'200'}];
var thisData=new Array;
var idLocation = pointData.length;

$(function () {
    for(var i = 0; i <idLocation; i ++){
        for(var i in pointData){
            if(pointData[i].style=="location"){
                $('#locationBarPlace').prepend('<i id="' + pointData[i].name +'" circlearea="'+ pointData[i].circlearea +'" x="' + pointData[i].x + '" y="' + pointData[i].y + '" class="iconfont icon-icon-technology-vidicon follow' + ' action' + pointData[i].name + '"' +
                    'style="left:' + pointData[i].x + ';top:' + pointData[i].y + ';"></i>');
                // console.log(circleArea(pointData[i].name,pointData[i].circlearea));
                $('#head').append(circleArea(pointData[i].name,pointData[i].circlearea));
            }else{
                $('#locationBarPlace').prepend('<i id="' + pointData[i].name +'" circlearea="'+ pointData[i].circlearea +'" x="' + pointData[i].x + '" y="' + pointData[i].y + '" class="iconfont icon-location follow' + ' action' + pointData[i].name + '" ' +
                    'style="left:' + pointData[i].x + ';top:' + pointData[i].y + ';"></i>');
                // console.log(circleArea(pointData[i].name,pointData[i].circlearea));
                $('#head').append(circleArea(pointData[i].name,pointData[i].circlearea));
            }
        }
    }
});

$(document).on('mousedown',".iconfont",function (e){
    $('.right-information').css({'display':'block'});
    if(e.which==1){
        var nowThis = $(this);

        goBack = 1;
        expectX = e.pageX - nowThis.offset().left;
        expectY = e.pageY - nowThis.offset().top;
        noData = true;

        //实时显示位置信息
        $('#input').find('input').eq(0).attr('value',nowThis.css('left').substring(0,nowThis.css('left').length-2));
        $('#input').find('input').eq(1).attr('value',nowThis.css('top').substring(0,nowThis.css('top').length-2));
        $('#input').find('input').eq(2).attr('value',nowThis.attr('id'));
        $('#input').find('input').eq(3).attr('value',nowThis.attr('circlearea'));
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
                    $(document).unbind("mousemove");
                }
            }else{
                if(-5 > locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                    nowThis.css({"left":-5,"top":locationTop});
                }
                if((boxWidth - 20) < locationLeft && 0 <= locationTop && locationTop <= (boxHeight - 25)){
                    nowThis.css({"left":(boxWidth - 20),"top":locationTop});
                }
                $(document).unbind("mousemove");
            }

            nowThis.mousemove(function (e) {
                if((boxLeft<e.pageX  && e.pageY>boxTop+40) || (boxLeft+60 <e.pageX  && e.pageY>boxTop)){
                    $('.point-delete').css('display','none');
                }else{
                    if(nowThis.hasClass('follow')){
                        $('.point-delete').css('display','block');
                    }

                }

            });

            //移动出40*90的小框后自动生成 图标
            if((boxLeft<e.pageX  && e.pageY>boxTop+40 && noData==true) || (boxLeft+60 <e.pageX  && e.pageY>boxTop && noData==true)){
                nowThis.addClass('follow');
                var allponit = $('.iconfont').length;
                var addpoint= $('.follow').length;
                if(allponit-addpoint<2){
                    if(nowThis.hasClass('icon-location')){
                        nowThis.attr('id',idLocation);
                        nowThis.addClass('action' + idLocation);
                        $('#head').append(circleArea(idLocation,60));
                        thisData = '{"name":"' + idLocation +'","x":"' + locationLeft +'","y":"' + locationTop +'","style":"location","circlearea":"60"}';
                        pointData.push(JSON.parse(thisData));
                        // console.log(pointData);
                        idLocation = idLocation + 1;
                        $('#locationBarPlace').append('<i id="' + idLocation +'" circlearea="60" class="iconfont icon-location"></i>');
                        noData = false;
                    }else{
                        nowThis.attr('id',idLocation);
                        nowThis.addClass('action' + idLocation);
                        $('#head').append(circleArea(idLocation,60));
                        thisData = '{"name":"' + idLocation +'","x":"' + locationLeft +'","y":"' + locationTop +'","style":"vidicon","circlearea":"60"}';
                        pointData.push(JSON.parse(thisData));
                        // console.log(pointData);
                        idLocation = idLocation + 1;
                        $('#locationBarPlace').prepend('<i id="' + idLocation +'" circlearea="60" class="iconfont icon-icon-technology-vidicon"></i>');
                        noData = false;
                    }
                }
            }else{

            }

            nowThis.attr('x',nowThis.css('left'));
            nowThis.attr('y',nowThis.css('left'));

            //实时显示位置信息
            $('#input').find('input').eq(0).attr('value',nowThis.css('left').substring(0,nowThis.css('left').length-2));
            $('#input').find('input').eq(1).attr('value',nowThis.css('top').substring(0,nowThis.css('top').length-2));
            $('#input').find('input').eq(2).attr('value',nowThis.attr('id'));
            $('#input').find('input').eq(3).attr('value',nowThis.attr('circlearea'));

        });
        //移动结束清除移动
        nowThis.mouseup(function (e) {

            if((boxLeft<e.pageX  && e.pageY>boxTop+40) || (boxLeft+60 <e.pageX  && e.pageY>boxTop)){

            }else{
                if (smallPlaceData==false){
                    //删除点位置
                    for (var i=0;i<pointData.length;i++){
                        if(pointData[i]==null){

                        }else{
                            if(pointData[i].name==nowThis.attr('id')){
                                pointData[i]=null;
                            }
                        }

                    }
                    //delete pointData[nowThis.attr('id')];
                    console.log(pointData);
                    nowThis.remove();
                    $('.point-delete').css('display','none');
                    $('#action'+nowThis.attr('id')).remove();
                }else{
                    if(goBack > 1){
                        //删除点位置 移动出之后再回来
                        for (var i=0;i<pointData.length;i++){
                            if(pointData[i]==null){

                            }else{
                                if(pointData[i].name==nowThis.attr('id')){
                                    pointData[i]=null;
                                }
                            }

                        }
                        // delete pointData[nowThis.attr('id')];
                        console.log(pointData);
                        nowThis.remove();
                        $('.point-delete').css('display','none');
                        $('#action'+nowThis.attr('id')).remove();
                    }else{
                        // 图标移动回去之后
                        var allponit = $('.iconfont').length;
                        var addpoint= $('.follow').length;
                        if(allponit-addpoint<2){
                            nowThis.removeClass('follow');
                        }

                    }

                }

            }
            $(document).unbind("mousemove");
            goBack = 1;
            console.log(thisData);
        });
    }

});
//鼠标右键屏蔽
$('#locationPlace').on('contextmenu',function(e){
    e.preventDefault();
});

//
$('#locationPlace').on('mousedown',function(e){
    $('.follow-message').css({'display':'none'});
    e.preventDefault();
});

//右键显示数据
$(document).on('mousedown',".follow",function (e){
    $('#input').find('input').eq(0).attr('value',$(this).css('left').substring(0,$(this).css('left').length-2));
    $('#input').find('input').eq(1).attr('value',$(this).css('top').substring(0,$(this).css('top').length-2));
    $('#input').find('input').eq(2).attr('value',$(this).attr('id'));
    $('#input').find('input').eq(3).attr('value',$(this).attr('circlearea'));
    $('.follow-message').css({'display':'none'});
    if(e.which==3){
        var x=parseInt($(this).css('left').substring(0,$(this).css('left').length-2))+40+"px";
        var y=parseInt($(this).css('top').substring(0,$(this).css('top').length-2))-40+"px";
        $('.follow-message').html('<p>X轴坐标: '+$(this).attr('x').substring(0,$(this).attr('x').length-2)+'</p><p>Y轴坐标: '+$(this).attr('y').substring(0,$(this).attr('y').length-2)+'</p><p>ID编号: '+$(this).attr('id')+'</p><p>半径: '+$(this).attr('circlearea')+'</p><div class="follow-message-left"></div>');
        $('.follow-message').css({'left': x,'top': y,'display':'block'});
        $('.follow-message').animate({
            left:'+=10px',
            display:'block'
        });

        $('.right-information').css({'display':'block'});
        e.preventDefault();
    }
});

//范围圈
 var circleArea = function(id,diameter){
    var style = '' + '<style id="action' + id +'">'+
        '.action'+ id +':after{' +
            "content: '';" +
            'position: absolute;' +
            'z-index: -10;' +
            'transform: rotateX(60deg);' +
            'background: rgba(255,255,255,0.5);' +
            'border-radius: 50%;' +
            'animation:mymovecircle' + id +' ease 3s infinite;' +
            '-webkit-animation:mymovecircle' + id +' ease 3s infinite;' +
        '}'+
        "@keyframes mymovecircle" + id +'{' +
            '0% {left: '+ (12-diameter/2) + 'px' + ';top: '+ (24-diameter/2) + 'px;'+'width: ' + diameter +'px;'+'height: ' + diameter + 'px' +';}' +
            '50% {left: '+ (17-diameter/2) + 'px' + ';top: '+ (29-diameter/2) + 'px;'+'width: ' + (diameter-10) +'px;'+'height: ' + (diameter-10) + 'px' +';}' +
            '100% {left: '+ (12-diameter/2) + 'px' + ';top: '+ (24-diameter/2) + 'px;'+'width: ' + diameter +'px;'+'height: ' + diameter + 'px' +';}' +
        '}' +
        '@-webkit-keyframes mymovecircle' + id +'{' +
            '0% {left: '+ (12-diameter/2) + 'px' + ';top: '+ (24-diameter/2) + 'px;'+'width: ' + diameter +'px;'+'height: ' + diameter + 'px' +';}' +
            '50% {left: '+ (17-diameter/2) + 'px' + ';top: '+ (29-diameter/2) + 'px;'+'width: ' + (diameter-10) +'px;'+'height: ' + (diameter-10) + 'px' +';}' +
            '100% {left: '+ (12-diameter/2) + 'px' + ';top: '+ (24-diameter/2) + 'px;'+'width: ' + diameter +'px;'+'height: ' + diameter + 'px' +';}' +
        '}' +
        '</style>';
    return style;
};

$('#changePoint').click(function () {
    var diameter = $('#input').find('input').eq(3).val();
    if($('#input').find('input').eq(3).val()=='' || $('#input').find('input').eq(3).val()=='请输入大小'){
        $('#input').find('input').eq(3).val('请输入大小')
    }else if (!isNaN(diameter)){
        if(10<=diameter && diameter<=300){
            var id = $('#input').find('input').eq(2).attr('value');
            //head标签栏里去除旧样式
            $('#action'+id).remove();

            //更改对应的 定位 circlearea的值
            $('#'+id).attr('circlearea',diameter);

            //
            if($('.follow-message').css('display')=='block'){
                $('.follow-message').find('p').eq(3).text('半径: '+diameter)
            }
            console.log(pointData.length);

            //遍历 数组 替换circlearea的值
            for (var i=0;i<pointData.length+1;i++){
                if(pointData[i]==null){

                }else{
                    console.log(pointData[i]);
                    if(pointData[i].name == id){
                        pointData[i].circlearea=diameter;
                    }
                }
            }
            //head标签栏里增加相应的新样式
            $('#head').append(circleArea(id,diameter));
        }else if (diameter<10){
            $('#input').find('input').eq(3).val('输入值太小')
        }else{
            $('#input').find('input').eq(3).val('输入值太大')
        }
    }else{
        $('#input').find('input').eq(3).val('请输入数字')
    }

});
