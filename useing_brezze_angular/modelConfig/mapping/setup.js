var mappers = [
    'personViewModel'
];













mappers = configs.select(function (mepper) {
    return 'modelMap/' + mepper;
});

mappers = ['modelMap/baseMapping'].concat(mappers);

define(mappers, setup);

function setup(baseMapping) {
    var x = baseConfig;

    // get data from server
}