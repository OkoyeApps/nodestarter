//Add configuration for application

var environment = {};

environment.staging = {
    "port" : 3000,
    "envName" : "staging"
};

environment.production = {
    port : 5000,
    envName : "production"
};


var currentEnvironment = typeof(process.env.NODE_ENV)
 == 'string' ? process.env.NODE_ENV.toLowerCase() :"";


 var environmentToExport =
  typeof(environment[currentEnvironment]) == 'object'
 ? environment[currentEnvironment] : environment.staging;

 module.exports = environmentToExport;