var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');


var root = path.resolve(process.argv[2] || '.');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;

    var filepath = path.join(root, './resource', pathname);
    
    console.log('filepath', filepath);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });

    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    // console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    // response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    // response.end('<h1>Hello world!</h1>');
});

// 让服务器监听 3344 端口:
server.listen(3344);

console.log('Server is running at http://127.0.0.1:3344/');

console.log(root);

