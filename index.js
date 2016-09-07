var util = require("util");
var path = require("path");
var nedb = require("nedb");
var nedbService = require("feathers-nedb");

var isNode = path.basename(process.argv[0]).toLowerCase().startsWith("node");
var rootPath = path.dirname(process.argv[ isNode ? 1 : 0]);

module.exports = function(app, config) {
    var config = util.isString(config) ? { name:config } : config;
    var dbPath = config.dbPath || path.resolve(rootPath, "db/");
    var apiPath = config.apiPath || "/api/"+config.name;
    var nedbFilePath = config.fileName || path.resolve(dbPath, config.name+".json");

    var nedbModel = new nedb({
        filename: nedbFilePath,
        autoload: true
    });

    app.use(apiPath, nedbService({ Model: nedbModel }));

    return app.service(apiPath);
};
