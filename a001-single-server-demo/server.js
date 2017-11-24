var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    var name = require('url').parse(req.url, true).query.name;
    if (name === undefined) name = 'world';  //访问localhost:1314 ===> 返回 Hello world
    if (name == 'pnghudie') {  //访问localhost:1314?name=pnghudie ===> 返回一张图片
        var file = 'hudie.png';
        fs.stat(file, function (err, stat) {
            if (err) {
                console.error(err);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("Sorry, pnghudie isn't around right now \n");
            } else {
                var img = fs.readFileSync(file);
                res.contentType = 'image/png';  //设置响应头，等价于res.writeHead(200, {'Content-Type': 'image/png'});
                res.contentLength = stat.size;
                res.end(img, 'binary');
            }
        });
    } else {  //访问localhost:1314?name=xxx ===> 放回 Hello xxx
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello ' + name + '\n');
    }
}).listen(1314);
console.log('Server running at port 1314/');