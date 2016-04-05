var fs = require('fs');

var casper = require('casper').create({
    clientScripts: ["jquery.js"]
});

var args = casper.cli.args;
var url = args[0];
var fileName = args[1];
var filePath = args[2];
var imgPath = args[3];
var imgAccessPath = args[4];

// casper.start('http://onepage.loudcloud.cn/article/opusres/15E6D5D4E8EE490A88434DC432A70FA3/index.html', function() {
//     //    this.echo(this.getTitle());
//     // fs.write('a.html', this.getHTML(), 'w'); // 写文件

// });

// var url = "http://onepage.loudcloud.cn/article/opusres/15E6D5D4E8EE490A88434DC432A70FA3/index.html ";
// var fileName = "index-wx";
// var filePath = "D:/workspace/myeclipse2014/article/src/main/webapp/opusres/D38BDD5EAC2F42BD91ADFCFD58FA7B20";
// var imgPath = "D:/workspace/myeclipse2014/article/src/main/webapp/opusres/D38BDD5EAC2F42BD91ADFCFD58FA7B20/static";
// var imgAccessPath = "http://onepage.loudcloud.cn/article/opusres";



casper.start(url, function() {
    //    this.echo(this.getTitle());
    // fs.write('a.html', this.getHTML(), 'w'); // 写文件

});



// casper.start(url, function() {

// });




// casper.then(function() {
//     var titleText = this.evaluate(function() {
//         // return document.querySelector('section.static-wrap-box');
//         return $($("section.static-wrap-box")[0]).html();
//     });
//     this.echo('Title is: ' + titleText  );
//     // this.evaluate(function() {
//     //     document.querySelector('section').textContent = 'New title';
//     // });
//     // this.echo('Title is now: ' + this.evaluate(function() {
//     //     return document.querySelector('section').textContent;
//     // }));
// });

casper.then(function() {

    var _tharray = this.evaluate(function() {// evaluate 相当于向模拟浏览器中添加需要执行的js函数
        var _styleObjAy = $("section[widget-type=style]");
        var _array = new Array();
        for (var index = 0; index < _styleObjAy.length; index++) {
            var element = _styleObjAy[index];
            $(element).parent().addClass("casper-th-" + index);
            _array.push("casper-th-" + index);
        }
        return _array;
    });
    // this.echo("返回结果：" + _tharray);


    // 截图
    for (var index = 0; index < _tharray.length; index++) {
        // console.log(_tharray[index]);
        this.captureSelector(imgPath + '/' + _tharray[index] + '.png', "section[class*=" + _tharray[index] + "]");
    }


    //替换自由布局模块为图片、替换图片组件为<img>
    // this.evaluate(function(imgAccessPath){
    //     // 自由布局组件
    //     var _casperTH = $("section[class*=casper-th-]");
    //     for(var index=0; index < _casperTH.length; index++) {
    //         $(_casperTH[index]).replaceWith("<img src='"+ imgAccessPath +"/casper-th-"+ index +".png' />");
    //     }

    //     // 图片组件
    //     var _imgRapl = $("section[widget-type=image]");
    //     var _imgObj;
    //     var _imgsrc;
    //     for(var _index=0; _index < _imgRapl.length;_index++){
    //         _imgObj = $(_imgRapl[_index]).find("section[build-od=image]").css("background-image");
    //         if(typeof(_imgObj) != 'undefined') {
    //             _imgsrc = _imgObj.substring(4,_imgObj.length-1);
    //             $(_imgRapl[_index]).parent().replaceWith("<img width='100%' src='"+ _imgsrc +"' >");
    //         }

    //     }

    // });


    // 输出html文件
    // fs.write(filePath + '/'+ fileName +'.html', this.getHTML("#section-base"), 'w'); // html写文件


    // this.captureSelector('11111.png', 'section.static-wrap-box:nth-child(17)');
    // this.captureSelector('2222.png', 'section.static-wrap-box:nth-child(4)');
});



casper.thenEvaluate(function(imgAccessPath) {
    // 自由布局组件
    var _casperTH = $("section[class*=casper-th-]");
    for (var index = 0; index < _casperTH.length; index++) {
        $(_casperTH[index]).replaceWith("<img src='" + imgAccessPath + "/casper-th-" + index + ".png' />");
    }

    // 图片组件
    var _imgRapl = $("section[widget-type=image]");
    var _imgObj;
    var _imgsrc;
    for (var _index = 0; _index < _imgRapl.length; _index++) {
        _imgObj = $(_imgRapl[_index]).find("section[build-od=image]").css("background-image");
        if (typeof (_imgObj) != 'undefined') {
            _imgsrc = _imgObj.substring(4, _imgObj.length - 1);
            $(_imgRapl[_index]).parent().replaceWith("<img width='100%' src='" + _imgsrc + "' >");
        }
    }
    
    // 删除标题
    $("#section-base>section").first().remove();
    
}, imgAccessPath);

casper.then(function() {
    // 输出html文件
    fs.write(filePath + '/' + fileName + '.html', this.getHTML("#section-base"), 'w'); // html写文件
});

phantom.outputEncoding = "gbk";



casper.run();



