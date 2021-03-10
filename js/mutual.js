//新闻列表
function ajax(params) {
    var result;
    $.ajax({
        url: 'http://106.38.115.83:8526' + params.url,
        data: params.data,
        type: params.type,
        timeout: 3000,
        contentType: params.contentType,
        async: params.async,     //异步请求
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
    }).done(function (response) {
        if (response.status == 200) {
            if (params.callback) {
                params.callback(response.data);
            } else {
                result = response.data;
            }
        }
    }).fail(function (jqXHR, textStatus, err) {
    });
    if (!params.callback) {
        return result;
    }
}

//查询新闻列表
function selecNewsData(data) {
    if (data.records != undefined && data.records.length > 0) {
        var params = ''
        for (var i = 0; i < data.records.length; i++) {
            params += '<div class="content-detail">' +
                ' <div class="detail-l">' +
                '<img src="' + img(data.records[i].imageUrl) + '" alt="">' +
                ' </div>' +
                ' <div class="detail-r">' +
                ' <a href="../pages/newsitem1.html?id=' + data.records[i].id + '">' +
                ' <div class="detail-r-title">' + data.records[i].title +
                ' </div>' +
                ' <div class="detail-r-content">' + data.records[i].description +
                ' </div>' +
                ' <div class="detail-r-date">' +
                ' <h3>' + datas(data.records[i].updateTime, '', '', 'd') + '</h3>' +
                ' <span>' + datas(data.records[i].updateTime, 'y', 'm', '') + '</span>' +
                ' </div>' +
                ' </a>' +
                ' </div>' +
                ' </div>'
        }
        $(".newsdetail-content").append(params);
    }
    if (data.total > 10) {
        $(".web-pagination").show()
    } else {
        $(".web-pagination").hide()
    }
}

function selecNewsDataIndex(data) {
    if (data.records != undefined && data.records.length > 0) {
        var newdata = data.records.slice(0, 3);
        var str = ''
        for (var i = 0; i < newdata.length; i++) {
            str += ' <div class="news-item">' +
                ' <div class="news-item-data">' + datas(data.records[i].updateTime, 'y', 'm', 'd') + '</div>' +
                ' <div class="news-item-title">' +
                ' <a href="/pages/newsitem1.html?id=' + newdata[i].id + '">' +
                ' <span></span>' + newdata[i].title + '' +
                ' </a>' +
                ' </div>' +
                ' </div>'
        }
        $(".news-content").append(str)
    }

}

//查询新闻详情
function selectNewsDetail(data) {
    var str = '';
    str += '<div class="newsdate">' +
        '            <p>' + datas(data.updateTime, '', '', 'd') + ' </p>' +
        '            <span>' + datas(data.updateTime, 'y', 'm', '') + '</span>' +
        '        </div>' +
        '        <h3>' + data.title + '</h3>' +
        '<div class="newitem-title">作者：' + data.author + '</div>' +
        '<div class="news-content">';
    for (var i = 0; i < data.detailList.length; i++) {
        if (data.detailList[i].type == 2) {
            str += '<p>' + data.detailList[i].content + '</p>'
        } else if (data.detailList[i].type == 1) {
            str += '            <div class="content-img">' +
                '                <img src="' + img(data.detailList[i].content) + '" alt="" class="pic-bottom">' +
                '<div style="margin-bottom: 20px;">' + data.detailList[i].caption + '</div>' +
                '            </div>'
        }

    }
    str += '        </div>'
    $(".newitem-block").append(str)
}

function selectAnimalList(data) {
    var type = GetQueryString('type');
    var data1 = data.records;
    if (data1 && data1.length > 0) {
        var t = '';
        if (type == 2) {
            t = '2'
        } else if (type == 1) {
            t = '1'
        } else {
            t = '3'
        }
        var str = '';
        for (var i = 0; i < data1.length; i++) {
            console.log(data1[i].tags == null);
            str += '<div class="img-item">' +
                '<a href="../pages/introductiondetail.html?id=' + data1[i].id + '&t=' + t + '">' +
                '<div class="item-pic">' +
                '<img src="' + img(data1[i].imagesUrl ? data1[i].imagesUrl : data1[i].imageUrl) + '" alt="">' +
                '</div>' +
                '<div class="item-title">' +
                '<span>' + data1[i].name +
                '</span>' +
                '</div>' +
                '<div class="item-introduce">' +
                '<span>' + data1[i].tags +
                '</span>' +
                '</div>' +
                '</a>' +
                '</div>'
        }
        $(".intro-detail-content-img").append(str);
        if (data1[0].title) {
            $(".left-title").text(data1[0].title)
        }
        if (data1[0].content) {
            $(".intro-detail-content-title span").text(data1[0].content)
        }
        $(".intro-detail-block-none").hide()
        $(".intro-detail-block").show()
    } else {
        $(".intro-detail-block-none").show()
        $(".intro-detail-block").hide()
    }
    if (data.total > 10) {
        $(".web-pagination").show()
    } else {
        $(".web-pagination").hide()
    }
}

function selectListDetail(data) {
    var t = GetQueryString('t');
    var str = '';
    if (data.libraryMain) {
        var d = data.libraryMain;
        var imgarr = d.imagesUrl.split(",");
        if (imgarr.length == 1) {
            str = '<h3>' + d.title + '</h3>' +
                '<div class="newitem-title"></div>' +
                ' <div class="news-content" style="margin-top: 30px">' +
                '            <div class="content1">' +
                '                <div class="content1-right">' +
                '                    <img src="'+img(imgarr[0])+'" alt="">' +
                '                </div>' +
                '                <div class="content1-left">' +
                '                    <p>'+d.content+'</p>' +
                '                </div>' +
                '            </div>' +
                '            <p>' +
                ''+d.content+''+
                '            </p>' +
                '            <p>' +
                ''+d.content+'' +
                '            </p>' +
                '        </div>'
        } else if (imgarr.length == 2) {
            str = '<h3>' + d.title + '</h3>' +
                '<div class="newitem-title"></div>' +
                '<div class="news-content" style="margin-top: 30px">' +
                '            <div class="content1">' +
                '                <div class="content1-right">' +
                '                    <img src="' + img(imgarr[0]) + '" alt="">' +
                '                </div>' +
                '                <div class="content1-left">' +
                '<p>' + d.content + '</p>' +
                '                </div>' +
                '            </div>' +
                '            <div class="content2">' +
                '                <div class="content2-left">' +
                '                    <img src="' + img(imgarr[1]) + '" alt="">' +
                '                </div>' +
                '                <div class="content2-right">' +
                '<p>'+d.content+'</p>' +
                '            </div>' +
                '        </div>'
        } else if (imgarr.length == 3) {
            str = '<h3>' + d.title + '</h3>' +
                '<div class="newitem-title"></div>' +
                ' <div class="news-content" style="margin-top: 30px">' +
                '            <p>'+d.content+'' +
                '            </p>' +
                '            <img src="' + img(imgarr[0]) + '" alt="" class="pic-center">' +
                '            <p>' +
                ''+d.content+'' +
                '            </p>' +
                '            <img src="' + img(imgarr[1]) + '" alt="" class="pic-center">' +
                '            <p>' +
                ''+d.content+'' +
                '            </p>' +
                '            <img src="' + img(imgarr[2]) + '" alt="" class="pic-center">' +
                '        </div>'
        } else {
            str =
                '<h3>' + d.title + '</h3>' +
                '<div class="news-content">' +
                '<p>' + d.content + '</p>' +
                '<div class="content-img">';
            for (var i = 0; i < imgarr.length; i++) {
                str += '<img src="' + img(imgarr[i]) + '" alt="" class="pic-bottom">';
            }
            str += '</div></div>'
        }
    } else {
        str =
            '<h3>' + data.title + '</h3>' +
            '<div class="news-content">' +
            '<p>' + data.content + '</p>' +
            '<div class="content-img">' +
            '<img src="' + img(data.imagesUrl) + '" alt="" class="pic-bottom">' +
            '</div></div>'
    }
    $(".newitem-block").append(str)
}

function points(data) {
    var s = sessionStorage.getItem('data')
    var str = '';
    if (data.records.length > 0) {
        // for (var i = 0; i < data.records.length; i++) {
        //     str += '<img src="' + img(data.records[i].imagesUrl) + '" alt="" data-src="' + img(data.records[i].imagesUrl) + '"  onclick=\'imgClick("'+img(data.records[i].imagesUrl)+'")\'>'
        // }
        // $(".pic-item").append(str)
        for (var i = 0; i < data.records.length; i++) {
            str += '<h3><span></span>' + data.records[i].name + '</h3>' +
                ' <label for="">' + data.records[i].tags +
                ' </label>'
        }
        $(".showdetail" + s).append(str);
        $(".showdetail" + s).show();
    }

}

function getFlower(data) {
    var str1 = '';
    var str2 = '';
    var str3 = '';
    var str4 = '';
    var chun = [];
    var xia = [];
    var qiu = [];
    var dong = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].season == 1) {
            chun.push(data[i]);
        } else if (data[i].season == 2) {
            xia.push(data[i]);
        } else if (data[i].season == 3) {
            qiu.push(data[i]);
        } else {
            dong.push(data[i]);
        }
    }
    var chun1 = chun.slice(0, 3);
    var xia1 = xia.slice(0, 2);
    var qiu1 = qiu.slice(0, 3);
    var dong1 = dong.slice(0, 2);
    for (var i = 0; i < chun1.length; i++) {
        str1 += '<div class="t t' + (i + 1) + '"><a href="../pages/introductiondetail.html?t=1&id=' + chun1[i].id + '">' + chun1[i].name + '</a></div>'
    }
    for (var i = 0; i < xia1.length; i++) {
        str2 += '<div class="t t' + (i + 1) + '"><a href="../pages/introductiondetail.html?t=1&id=' + chun1[i].id + '">' + xia1[i].name + '</a></div>'
    }
    for (var i = 0; i < qiu1.length; i++) {
        str3 += '<div class="t t' + (i + 1) + '"><a href="../pages/introductiondetail.html?t=1&id=' + chun1[i].id + '">' + qiu1[i].name + '</a></div>'
    }
    for (var i = 0; i < dong1.length; i++) {
        str4 += '<div class="t t' + (i + 1) + '"><a href="../pages/introductiondetail.html?t=1&id=' + chun1[i].id + '">' + dong1[i].name + '</a></div>'
    }
    $(".plant-text1").append(str1);
    $(".plant-text2").append(str2);
    $(".plant-text3").append(str3);
    $(".plant-text4").append(str4);

}

//显示的图片处理
function img(url) {
    return 'http://106.38.115.83:8526/files/view/image?objectName=' + url
}

//日期处理
function datas(time, y, m, d) {
    var t = time.split(' ')[0];
    if (y == '' && m == '' && d != '') {
        return t.split("-")[2]
    }
    if (y != '' && m != '' && d == '') {
        return t.split("-")[0] + '-' + t.split("-")[1]
    }
    if (y != '' && m != '' && d != '') {
        return t.split("-")[0] + '-' + t.split("-")[1] + '-' + t.split("-")[2]
    }
}
