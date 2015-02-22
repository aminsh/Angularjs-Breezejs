
function contextConfig() {
    var config = {};

    config.validateOn = 'propertyChange'; //submit - propertyChange
    config.rootUrl = 'api/';

    return config;
}

define([], contextConfig);