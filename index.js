var { createServer, METHODS } = require('http');
var { parse } = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./lib/config');
var helper = require('./lib/helper');
var datahelp = require('./lib/data');
//Startup the httpsserver
var httpServer = createServer(function (req, res) {

    datahelp.create('users', "test",
     {name : "node starter", description: "Testing new file"}, function(err){
         console.log("file creation", err);
     });


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
        decoder.end();

        var data =  {
            trimedPath : trimedPath,
            query : queryString,
            method : method,
            headers : headers,
            payload : helper.parsejsonObject(buffer)
        };

        console.log("trimed path", trimedPath);
        var chosenhandler = typeof(router[trimedPath]) !== 'undefined' ?  router[trimedPath] :
        handler.notFound;

        chosenhandler(data, function(statuscode,  payload){
            var payloadString = JSON.stringify(payload);
            statuscode = typeof(statuscode) == 'number' ? statuscode : 200;
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statuscode)
            res.end(payloadString);
            console.log("end response" + " trimed path " + statuscode, payload);

        })
    })

})

var handler = {};

handler.ping = (data, callback) => {
    callback(200, {success : true });
}

handler.notFound = (data, callback) => {
    callback(404, {success : false, message : "Not found"});
}



var router = {
    'ping' : handler.ping
};


httpServer.listen(config.port, function () {
    console.log(`server is running on port ${config.port}`);
})

