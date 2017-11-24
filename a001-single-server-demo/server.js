var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    var name = require('url').parse(req.url, true).query.name;
    if (name === undefined) name = 'world';  //����localhost:1314 ===> ���� Hello world
    if (name == 'pnghudie') {  //����localhost:1314?name=pnghudie ===> ����һ��ͼƬ
        var file = 'hudie.png';
        fs.stat(file, function (err, stat) {
            if (err) {
                console.error(err);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("Sorry, pnghudie isn't around right now \n");
            } else {
                var img = fs.readFileSync(file);
                res.contentType = 'image/png';  //������Ӧͷ���ȼ���res.writeHead(200, {'Content-Type': 'image/png'});
                res.contentLength = stat.size;
                res.end(img, 'binary');
            }
        });
    } else {  //����localhost:1314?name=xxx ===> �Ż� Hello xxx
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello ' + name + '\n');
    }
}).listen(1314);
console.log('Server running at port 1314/');