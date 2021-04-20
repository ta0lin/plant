//计算偷图尺寸
function header(height,width) {
    var Width = $(window).width();
    var height = (height / width).toFixed(2) * Width;
    $(".index-header").height(Width);
    $(".index-header").height(height);
}
//获取url的hash值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
function pcOrH5(){
    //初始化js
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphone = sUserAgent.match(/iphone/i) == "iphone";
    var bIsIpod = sUserAgent.match(/iphone/i) == "ipod";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIphone || bIsIpod || bIsAndroid || bIsWM || bIsIpad) {
        window.location.href = "http://106.38.115.83:9827/plantMobile";
    }
}
pcOrH5()
