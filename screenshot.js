var fs = require('fs');



var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    viewportSize: { width: 1920, height: 1200 }
});



var args = casper.cli.args;
var url = 'http://onepage.loudcloud.cn/article/opusres/15E6D5D4E8EE490A88434DC432A70FA3/index.html';
// var url = 'http://www.baidu.com/';
var filename = 'D:/ssss.png';
var selector = 'section.static-wrap-box:nth-child(17)';


// var args = casper.cli.args;
// var url = args[0];
// var filename = args[1];
// var selector = args[2];

// casper.start(url,function () {
//     console.log(".................");
//     require('utils').dump(this.getElementsByTagName('h2')[0]);
// });

casper.start(url, function() {
    // fs.writeFile('delete.txt','1234567890',function(err){
    //     console.log('youxi!');
    // });
    fs.write('./b.html', this.getHTML(), 'w'); // 写文件
  

});


var callbackFun = function() {
    var args = [filename];
    var method = 'capture';
    if (selector) {
        args.push(selector);
        method = 'captureSelector';
    }
    this[method].apply(this, args);
}

var nextStep = 'then';
var nextStepArgs = [callbackFun];
if (selector) {
    nextStep = 'waitForSelector';
    nextStepArgs.unshift(selector);
    nextStepArgs.push(function() { this.echo('Timeout Error!!!') });
    nextStepArgs.push(10000);
}

casper[nextStep].apply(casper, nextStepArgs);

casper.run(function() {
    this.echo('Done.').exit();
});


