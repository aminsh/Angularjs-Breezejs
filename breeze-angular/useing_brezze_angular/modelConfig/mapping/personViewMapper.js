define(['modelMap/baseMapper'], personViewMapper);

function personViewMapper(baseMapper) {

    function map(data) {
        data.FullName = function() {
            return data.FirstName + ' ' + data.LastName;
        }

        return data;
    }

    baseMapper.push({ Name: 'PersonViewModel', Map: map });
}                                                                                                         