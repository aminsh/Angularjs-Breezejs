define(['modelConfig/baseConfig'], personConfig);

function personConfig(configs) {

    var person = {
        Name: 'Person',
        Validattors: [
            {
                Name: 'Custom1',
                Validate: function(data) {
                    return { ErrorMessage: 'شما مجاز به انجام این عملیات نیستید', PropertyName: 'Id' };
                }
            },
            {
                Name: 'Custom2',
                Validate: function(data) {
                    return { ErrorMessage: 'نام حتما باید دارای مقدار باشد', PropertyName: 'FirstName' };
                }
            }
        ],
        Properties: [
            {
                Name: 'FirstName',
                Title: 'نام',
                Type: 'string',
                Validattors: [
                    { Name: 'Requierd', ErrorMessage: 'نام اجباری است' },
                    { Name: 'StringLenght', MinLenght: 5, MaxLenght: 50, ErrorMessage: 'نام میبایست بین 5 تا 50 کاراکتر باشد' }
                ]
            }
        ]
    };

    configs.push(person);
}