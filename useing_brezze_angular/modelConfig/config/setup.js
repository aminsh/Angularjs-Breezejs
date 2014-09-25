var configs = [
    'personConfig',
    'productConfig'
];













configs = configs.select(function (config) {
    return 'modelConfig/' + config;
});

configs = ['modelConfig/baseConfig'].concat(configs);

define(configs, setup);

function setup(baseConfig) {
    var x = baseConfig;

    // get data from server
}