var helper = {};

helper.parsejsonObject = function(Str){
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (error) {
        return {}
    }
}

module.exports = helper;