function validation() {
    var customValidator = {
        compare: function (compareProperties) {
            return new breeze.Validator(
                     "compare",
                     function (model, context) {
                         //context.password = model.getProperty(compareProperties.prop);
                         //if (isNullOrEmpty(model.getProperty('Password')) && isNullOrEmpty(model.getProperty('ConfirmPassword')))
                         //    return true;
                         return model.getProperty(compareProperties.prop) === model.getProperty(compareProperties.otherProp);
                     },
                     {
                         messageTemplate: "یکسان نیست",
                         compareProperties: compareProperties
                     });
        }
    };

    var validations = function (prop, type) {
        var validators = [];

        var typeVld = validationOnType(prop);
        if (!isNullOrEmpty(typeVld))
            validators.push(typeVld);

        var breezeVld;

        prop.Validators.foreach(function (vld) {
            var name = vld.Name.toLowerCase();

            if (name.contains('required')) {
                breezeVld = breeze.Validator.required();
                breezeVld.context.messageTemplate = vld.ErrorMessage;
                validators.push(breezeVld);
            }

            if (name.contains('stringlength')) {
                breezeVld = breeze.Validator.stringLength({ minLength: vld.MinLength, maxLength: vld.MaxLength });
                breezeVld.context.messageTemplate = vld.ErrorMessage;
                validators.push(breezeVld);
            }

            if (name.contains('email')) {
                breezeVld = breeze.Validator.emailAddress();
                breezeVld.context.messageTemplate = vld.ErrorMessage;
                validators.push(breezeVld);
            }

            if (name.contains('maxlength')) {
                breezeVld = breeze.Validator.maxLength({ maxLength: vld.MaxLength });
                breezeVld.context.messageTemplate = vld.ErrorMessage;
                validators.push(breezeVld);
            }

            if (name.contains('compare')) {
                breezeVld = customValidator.compare({ property: prop.Name, otherProperty: vld.OtherPropertyName });
                breezeVld.context.messageTemplate = vld.ErrorMessage;
                //validators.push(breezeVld);
                type.validators.push(breezeVld);
            }
        });
        return validators;
    };

    var set = function (manager, metadata) {
        manager.metadataStore.getEntityTypes()
            .foreach(function (breezeType) {
                var vld = customValidator.compare({ prop: 'Email', otherProp: 'ConfirmEmail' });
                vld.context.messageTemplate = vld.ErrorMessage;
                //validators.push(breezeVld);
                breezeType.validators.push(vld);
                breezeType.dataProperties.foreach(function (breezeProp) {
                    var prop = getPropByName(metadata, breezeType.shortName, breezeProp.name);
                    if (isNullOrEmpty(prop))
                        return;
                    breezeProp.validators.removeAll();
                    breezeProp.validators = validations(prop, breezeType);
                });
            });
    };

    var validate = function (obj) {
        obj.errors = ko.observableArray();

        function onChange() {
            var errors = obj.entityAspect.getValidationErrors().select(function (error) {
                return { message: error.errorMessage, property: error.propertyName, serverError: false };
            });

            obj.errors(errors);
           
            obj.hasError(errors.any());
        }

        onChange();

        obj.entityAspect.validationErrorsChanged.subscribe(onChange);
    };

    var validationOnType = function (prop) {
        var type = prop.Type.toLowerCase();
        var validator = breeze.Validator;
        var vld;

        if (type.contains('int')) {
            vld = validator.integer();
            vld.context.messageTemplate = prop.Title + ' از نوع عددی میباشد ';
            return vld;
        }

        if (type.contains('double')) {
            vld = validator.double();
            vld.context.messageTemplate = prop.Title + ' از نوع عددی میباشد ';
            return vld;
        }

        if (type.contains('date')) {
            vld = validator.date();
            vld.context.messageTemplate = prop.Title + ' از نوع تاریخ میباشد ';
            return vld;
        }

        if (type.contains('bool')) {
            vld = validator.bool();
            vld.context.messageTemplate = prop.Title + ' از نوع بلی یا خیر میباشد ';
            return vld;
        }

        return null;
    };

    var getPropByName = function (metadata, entityName, propName) {
        var entity = metadata.first(function (item) {
            return item.Name == entityName;
        });

        if (entity == null)
            return null;

        var prop = entity.Properties.first(function (item) {
            return item.Name == propName;
        });

        return prop;
    };

    return {
        validations: validations,
        set: set,
        validate: validate
    };
}