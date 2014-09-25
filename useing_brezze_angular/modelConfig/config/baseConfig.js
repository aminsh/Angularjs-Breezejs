define([], baseConfig);

function baseConfig() {
    var configs = [];
    if (window.hasOwnProperty('modelConfigs'))
        configs = window.modelConfigs;
    else
        window.modelConfigs = [];

    return configs;
}