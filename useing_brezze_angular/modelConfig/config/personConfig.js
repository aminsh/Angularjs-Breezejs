define(['modelConfig/baseConfig'], personConfig);

function personConfig(configs) {

    var person = {
        Name: 'Person',
        Validators: [
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
                Validators: [
                    { Name: 'Requierd', ErrorMessage: 'نام اجباری است' },
                    { Name: 'StringLenght', MinLength: 5, MaxLength: 50, ErrorMessage: 'نام میبایست بین 5 تا 50 کاراکتر باشد' },
                    { Name: 'Custom', Validate: function (data) { return { ErrorMessage: 'همینطوری خطا', PropertyName: 'FirstName' }; } }
                ]
            }
        ]
    };

    configs.push(person);
}