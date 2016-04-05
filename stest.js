

var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    viewportSize: { width: 1920, height: 1200 }
});





casper.start('http://onepage.loudcloud.cn/article/opusres/15E6D5D4E8EE490A88434DC432A70FA3/index.html', function() {
    console.log("111111111");
    this.captureSelector('11111.png', 'section.static-wrap-box:nth-child(17)');
    this.captureSelector('2222.png', 'section.static-wrap-box:nth-child(4)');
});



casper.run();