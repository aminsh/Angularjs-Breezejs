define(['modelConfig/validation/validators'], vld);

function vld(validators) {
    function validate(item) {
        var errors = [];
        item.errors.removeAll();

        item.type.validators.forEach(function(v) {
            var result = v.validate(item);
            if (!result)
                errors.push(result);
        });

       //TODO
       // this should be replace with selectMany
        item.type.Properties.forEach(function(prop) {
            prop.validators.forEach(function (v) {
                var result = {};
                if (v.Name == 'Custom') {
                    result = v.validate(item);
                    if (!result)
                        errors.push(result);
                }

                var valname = getKeys(validators)
                    .first(function (key) { return key.toLowerCase() == v.Name.toLowerCase(); });
                var validator = validators[valname];
                result = validator.validate(item);
                if (!result)
                    errors.push(result);
            });
        });

        item.errors.removeAll();
        errors.select(function(err) {
            return {
                isService: false,
                errorMessage: err.errorMessage,
                propertyName: isNullOrEmpty(err.propertyName) ? '' : err.propertyName
            }
        }).forEach(function (err) { item.errors.push(err); });

        item.hasError = item.errors.any();
    }

    return validate;
}