var util = require("util");
var path = require("path");
var appRootPath = require("app-root-path");
var nedb = require("nedb");
var nedbService = require("feathers-nedb");

module.exports = function(app, config) {
    var config = util.isString(config) ? { name:config } : config;
    var dbPath = config.dbPath || appRootPath.resolve("db/");
    var apiPath = config.apiPath || "/api/"+config.name;
    var nedbFilePath = config.fileName || path.resolve(dbPath, config.name+".json");

    var nedbModel = new nedb({
        filename: nedbFilePath,
        autoload: true
    });

    app.use(apiPath, nedbService({ Model: nedbModel }));

    console.log("config.name: "+config.name);
    console.log("dbPath: "+dbPath);
    console.log("apiPath: "+apiPath);
    console.log("nedbFilePath: "+nedbFilePath);

    return app.service(apiPath);
};
