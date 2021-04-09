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
        sessionStorage.setItem('ntotal',data.total)
        $(".web-pagination").show()
    } else {
        $(".web-pagination").hide()
    }
}

function selecNewsDataIndex(data) {
    if (data.records != undefined && data.records.length > 0) {
        var newdata = data.records.slice(0, 6);
        var str = ''
        for (var i = 0; i < newdata.length; i++) {
            str += ' <div class="news-item">' +
                ' <div class="news-item-data">' + datas(data.records[i].updateTime, 'y', 'm', 'd') + '</div>' +
                ' <div class="news-item-title">' +
                ' <a href="/plant/pages/newsitem1.html?id=' + newdata[i].id + '">' +
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
    var classify = GetQueryString('classify');
    var t = '';
    if (type == 2) {
        t = '2'
    } else if (type == 1) {
        t = '1'
    } else {
        t = '3'
    }
    var str = '';
    if (type == 2) {
        if (classify.indexOf(6)!=-1) {
            if (data.records[0].subMainType == 6){
                var str1 = computeddata(data.records, '昆虫展区','','kc.png');
            }
            else{
                var str2 = computeddata(data.records, '蝴蝶展区','','dd.png');
            }
            $(".intro-detail-content-img").append(str1);
            $(".intro-detail-content-img01").append(str2);
            $(".intro-detail-block-none").hide()
            $(".intro-detail-block").show()
        } else {
            var arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [];
            data.records.forEach(function (item) {
                if (item.specimenKindId == 1) {
                    arr1.push(item)
                } else if (item.specimenKindId == 2) {
                    arr2.push(item)
                } else if (item.specimenKindId == 3) {
                    arr3.push(item)
                } else if (item.specimenKindId == 1377439114633916417) {
                    arr4.push(item)
                } else if (item.specimenKindId == 1377440754711638018) {
                    arr5.push(item)
                } else if (item.specimenKindId == 1377441059713036289) {
                    arr6.push(item)
                } else {
                    arr7.push(item)
                }
            })
            str += computeddata(arr1, '腹足纲', '腹足纲身体器官通常左右不对称，头部发达，具有成对的触角和眼睛，口中有带状齿舌，足部发达，位于身体腹面，通常有一个螺旋形的贝壳。腹足纲是最大的类群，种类众多，多生活在海洋里，如各种海螺；也有部分生活在淡水，如田螺；还有一些生活在陆地上，如蜗牛。','bk.png');
            str += computeddata(arr2, '双壳纲', '双壳纲身体侧扁，有左右两枚贝壳。头部退化，常具有水管，用来呼吸和滤食浮游的食物。双壳纲种类众多，数量仅次于腹足纲，多数生活在海洋里，少部分产于淡水。','bk.png');
            str += computeddata(arr3, '头足纲', '头足纲贝壳常退化，有发达的头部和外套膜，眼睛发达，具有许多触手，擅长游泳。现存种类较少，全部生活在海洋里。包括章鱼、乌贼、鱿鱼、鹦鹉螺等。','bk.png');
            str += computeddata(arr4, '宝螺科', '也称宝贝科，是腹足纲的一个大科，也是极具观赏性的一个科。宝螺外壳的螺旋部不发达，但是体螺层极其发达，并且在螺口上有着齿的结构。在生活的时候，宝螺的外套膜会将自己的外壳包裹在内，只有在遇到危险时才会缩回壳中。包裹着外壳的外套膜还会不断向壳上分泌珍珠质，使得宝螺的螺壳变得十分光滑且厚重。','bk.png');
            str += computeddata(arr5, '骨螺科', '是腹足纲中一个非常具有观赏价值的科，各种骨螺也时常成为收藏爱好者的宠儿。骨螺的突出特征是其壳上丰富的突起结构，大部分骨螺壳上长着长短不一的刺，也有一些骨螺长着“叶片”状的结构。关于骨螺这些突起结构的用途目前仍未有定论，有研究者认为这些突起是御敌措施，也有人认为类似的结构能够防止骨螺陷入沙子中。','bk.png');
            str += computeddata(arr6, '芋螺科', '芋螺的科外形独特，顶部宽而下部逐渐变窄，形似芋头，并因此得名。如果将芋螺倒转过来，其外形又像一个鸡心，因此芋螺有时候也会被叫成鸡心螺。芋螺种类丰富，并且多种芋螺的外壳上有丰富的花纹，因此芋螺也具有较高的观赏与收藏价值','bk.png');
            str += computeddata(arr7, '其他', '','bk.png')
            $(".intro-detail-content-img").append(str);
            $(".intro-detail-block-none").hide()
            $(".intro-detail-block").show()
        }

    } else {
        var data1 = data.records;
        if (data1 && data1.length > 0) {
            str += '<div class="item-block">'
            for (var i = 0; i < data1.length; i++) {
                str += '<div class="img-item">' +
                    '<a href="../pages/introductiondetail.html?id=' + data1[i].id + '&t=' + t + '">' +
                    '<div class="item-pic">' +
                    '<img src=" ' + img(data1[i].specimentImageUrl ? data1[i].specimentImageUrl : data1[i].imageUrl) + '" alt="">' +
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
            str += '</div>'
            $(".intro-detail-content-img").append(str);
            $(".intro-detail-block-none").hide()
            $(".intro-detail-block").show()
        } else {
            $(".intro-detail-block-none").show()
            $(".intro-detail-block").hide()
        }
    }
    if (type != 2) {
        sessionStorage.setItem('total',data.total)
        if (data.total > 9) {
            $(".web-pagination").show()
        } else {
            $(".web-pagination").hide()
        }
    } else {
        $(".web-pagination").hide()
    }
}

function selectListDetail(data) {
    // var t = GetQueryString('t');
    var str = '';
    // if (data.libraryMain) {
    var d = data.libraryMain ? data.libraryMain : data;
    var imgarr = d.imagesUrl.split(",");
    if (imgarr.length == 1) {
        str = '<h3>' + d.title + '</h3>' +
            '<div class="newitem-title"></div>' +
            ' <div class="news-content" style="margin-top: 30px">' +
            '            <div class="content1">' +
            '                <div class="content1-right">' +
            '                    <img src="' + img(imgarr[0]) + '" alt="">' +
            '                </div>' +
            '                <div class="content1-left">' +
            '                    <p>' + d.content + '</p>' +
            '                </div>' +
            '            </div>' +
            '            <p>' +
            '            </p>' +
            '            <p>' +
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
            '            </div>' +
            '        </div>'
    } else if (imgarr.length == 3) {
        str = '<h3>' + d.title + '</h3>' +
            '<div class="newitem-title"></div>' +
            ' <div class="news-content" style="margin-top: 30px">' +
            '            <p>' + d.content + '' +
            '            </p>' +
            '            <img src="' + img(imgarr[0]) + '" alt="" class="pic-center">' +
            '            <p>' +
            '            </p>' +
            '            <img src="' + img(imgarr[1]) + '" alt="" class="pic-center">' +
            '            <p>' +
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
    // } else {
    //     str =
    //         '<h3>' + data.title + '</h3>' +
    //         '<div class="news-content">' +
    //         '<p>' + data.content + '</p>' +
    //         '<div class="content-img">' +
    //         '<img src="' + img(data.imagesUrl) + '" alt="" class="pic-bottom">' +
    //         '</div></div>'
    // }
    $(".newitem-block").append(str)
}

function points(data) {
    console.log(data)
    var s = sessionStorage.getItem('data')
    var str = '';
    if (JSON.parse(JSON.stringify(data)) != '{}') {
        str += '<h3><span></span>' + data.name + '</h3>' +
            ' <label for="">' + data.tags +
            ' </label>' +
            '<div class="getmore">' +
            '<a href="../pages/newsitem2.html?p=' + data.name + '">查看更多></a>' +
            '</div>'
        $(".showdetail" + s).text('');
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

//处理数据
function computeddata(data, title, intro,url) {

    var str = '<div class="block">' +
        '<div class="block-title">' +
        '<img src="../images/introduction/'+url+'" alt="">' +
        '<span>' + title + '</span>' +
        '</div>' +
        '<div class="block-content">' + intro + '</div>' +
        '<div class="item-block">';
    for (var i = 0; i < data.length; i++) {
        str += '<div class="img-item">' +
            '<a href="../pages/introductiondetail.html?id=' + data[i].id + '&t=' + 2 + '">' +
            '<div class="item-pic">' +
            '<img src=" ' + img(data[i].specimentImageUrl ? data[i].specimentImageUrl : data[i].imageUrl) + '" alt="">' +
            '</div>' +
            '<div class="item-title">' +
            '<span>' + data[i].name +
            '</span>' +
            '</div>' +
            '<div class="item-introduce">' +
            '<span>' + data[i].tags +
            '</span>' +
            '</div>' +
            '</a>' +
            '</div>'
    }
    str += '</div></div>';
    return str;
}

function pointsDetail(data) {
    var imgarr = data.imagesUrl.split(",")
    console.log(imgarr);
    var str =
        '<h3>' + data.name + '</h3>' +
        '            <div class="content-img">' +
        '<div style="margin-top: 30px;line-height: 28px;font-size: 16px;">' + data.content + '</div>'
    for (var i = 0; i < imgarr.length; i++) {
        str += '<img src="' + img(imgarr[i]) + '" alt="" class="picbig">';
    }
    str += '            </div></div>'
    $(".newitem-block").append(str);
}
