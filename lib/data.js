var fs = require('fs');
var path = require('path');
var helper = require('./helper');
var lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = function (dir, filename, data, callback) {
    fs.open(lib.baseDir + dir + '/' + filename + '.json', 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback("Error closing new file");
                        }
                    })
                } else {
                    callback("Error writing to file");
                }
            })
        } else {
            callback("could not create a new file, it may exist already");
        }
    })

}

lib.read = function (dir, filename, callback) {
    fs.readFile(lib.baseDir + dir + '/' + filename + '.json','utf-8',  function(err, data){
        if(!err && data){
            callback(false, helper.parsejsonObject(data));
        }else{
            callback(err, data);
        }
    })

}

lib.update = function (dir, filename, data, callback) {

}

lib.delete = function (dir, filename, callback) {

}

module.exports = lib;