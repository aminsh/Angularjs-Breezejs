define(['modelConfig/baseConfig'], productConfig);

function productConfig(configs) {

    var product = {
        Name: 'Product',
        Properties: [
            { Name: '', Title: '', Type: '', Validattors: [] }
        ]
    };

    configs.push(product);
}