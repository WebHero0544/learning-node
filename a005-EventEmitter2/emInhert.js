"use strict";
var util = require('util');
var eventEmitter = require('events').EventEmitter;
var fs = require('fs');


function InputChecker(name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt', {
        'flags': 'a',
        'encoding': 'utf8',
        'mode': 0o666
    });
};
util.inherits(InputChecker, eventEmitter); //让InputChecker构造函数继承eventEmitter
InputChecker.prototype.check = function check(input) {
    // trim extraneous white space 去除多余的空格
    let command = input.trim().substr(0, 3);
    // process command  进程命令
    if (command == 'wr:') {  // if wr, write input to file  该命令用于写文件
        this.emit('write', input.substr(3, input.length));
      
    } else if (command == 'en:') {  // if en, end process  该命令用于结束进程
        this.emit('end');
        
    } else {  // just echo back to standard output  该命令用于直接输出
        this.emit('echo', input);
    }
};



// testing new object and event handling 处理实例化对象 和 绑定事件监听函数
let ic = new InputChecker('Shelley', 'output');
ic.on('write', function(data) {
    this.writeStream.write(data, 'utf8');  //写文件
});
ic.on('echo', function(data) {
    process.stdout.write(ic.name + ' wrote ' + data);  //直接输出
});
ic.on('end', function() {
    process.exit();  //结束进程
});


// capture input after setting encoding 在设置编码完成后捕获输入
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
    let input = process.stdin.read();
    if (input !== null) ic.check(input);  //检测输入
});