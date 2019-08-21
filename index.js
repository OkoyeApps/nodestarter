var { createServer, METHODS } = require('http');
var { parse } = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./lib/config');
//Startup the httpsserver
var httpServer = createServer(function (req, res) {
    //Get the url and parse it 
    var parsedurl = parse(req.url, true);
    var pathname = parsedurl.pathname;
    //trim the parsed url
    var trimedPath = pathname.replace(/^\/+|\/+$/g, "");
    //get the query string from the url
    var queryString = parsedurl.query;
    //get headers from request
    var headers = req.headers;
    //get http methods
    var method = req.method.toLowerCase();

    var decoder = new stringDecoder('utf-8');
    var buffer = "";
    req.on('data', function (datachunk) {
        buffer += decoder.write(datachunk);
    })

    req.on('end', function () {
        decoder.end()
        res.setHeader("Content-Type", "application/json");
        res.writeHead(500)
        res.end("end response" + " trimed path " + trimedPath);
    })

})


httpServer.listen(config.port, function () {
    console.log(`server is running on port ${config.port}`);
})

