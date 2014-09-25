define([], baseMapper);

function baseMapper() {
    var mappers = [];
    if (window.hasOwnProperty('modelMappers'))
        mappers = window.modelMappers;
    else
        window.modelMappers = [];

    return mappers;
}