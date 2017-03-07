function change(){
        var winWid=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var winHei=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var frameLeftWid=$('.frameLeft').width();
        var headerHei=$('.header').height();
        var breadHei=$('.bread').height();

        $('.frameRight').css({'width':(winWid-frameLeftWid)+'px'});
        $('.mainContent').css({'height':(winHei-headerHei)+'px'});
        $('.frameBox').css({'height':(winHei-headerHei-breadHei)+'px'});
}
window.onload = function () {change()}
alert("hhah");
window.onresize = function () {change()}