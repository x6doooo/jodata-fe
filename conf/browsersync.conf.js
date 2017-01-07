const conf = require('./gulp.conf');

var httpProxy = require('http-proxy');
var url = require('url');


module.exports = function () {

    var server = {
        baseDir: [
            conf.paths.tmp,
            conf.paths.src
        ]
    };

    var proxy = httpProxy.createProxyServer({});
    server.middleware = [
        function(req, res, next) {
            var theURL = url.parse(req.url);
            if (theURL.pathname.indexOf('/api') != -1) {
                proxy.web(req, res, {
                    target: 'http://127.0.0.1:12321'
                });
            } else {
                next()
            }
        }
    ];


    return {
        server: server,
        open: false
    };
};
