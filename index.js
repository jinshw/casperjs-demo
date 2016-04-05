
// var fs = require('fs');

// fs.writeFile('delete.txt','1234567890',function(err){
//     console.log('youxi!');
// });



var count = 0;
console.log('主进程开启');
var startTime = new Date().getTime();


captureRq();

/*
启动casperjs读取单个url
*/
function captureRq(url) {
    count++;
    console.log('out...' + count);
    var spawn = require('child_process').spawn,
        //     ls = spawn('G:\\study\\screeshot\\node_modules\\casperjs\\bin\\casperjs', ['screenshot.js','http://onepage.loudcloud.cn/article/opusres/15E6D5D4E8EE490A88434DC432A70FA3/index.html','aadd.png','section.static-wrap-box:nth-child(17)']);

        ls = spawn('G:\\study\\screeshot\\node_modules\\casperjs\\bin\\casperjs', ['casperjsReplaceStyle.js']);

        // console.log("111111111111",ls);
    ls.on('close', function(code) {
        if (code == 1) {
            console.log('child process异常结束。目标：' + url);
        }
    });





}

