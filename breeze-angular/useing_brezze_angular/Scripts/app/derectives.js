app.directive('textbox', ['metadata',ng_textbox]);

function ng_textbox(metadata) {
    var restrict = 'E';
    var template =
        '<div>' +
        '<label>{{label}}</label>' +
        '<input type="text" class="form-control" ng-model="model[propName]" />' +
        '<span ng-repeat="e in getError()" ng-if="showValidation" ' +
            'class="label label-danger" style="margin-left: 3px">' +
            '{{e.errorMessage}}' +
        '</span>'+
        '</div>';
   
    var require = '^frm';
    var scope = true;

    function link(scope, element, attrs, parent) {
        scope.model = parent.model;

        var modelName = scope.model.entityType.shortName;
        var prop = metadata.first(function(item) {
            return item.Name == modelName;
        }).Properties.first(function(p) {
            return p.Name == attrs.property;
        });

        scope.label = prop.Title;
        scope.propName = attrs.property;

        scope.getError = function() {
            return scope.model.errors.filter(function (e) {
                return e.propertyName == attrs.property;
            });
        }
    }

    return {
        restrict: restrict,
        template: template,
        scope: scope,
        replace: true,
        link: link,
        require: require
    };
}


app.directive('frm', [function ($compile) {
    return {
        restrict: 'E',
        template: '<div>' +
            '<div ng-transclude>' +
            '</div>' +
            '<div ng-if="model.hasError && showvalidation" ' +
            'class="alert alert-danger" role="alert" style="margin-top: 10px;">' +
            '<strong>خطا ها را تصحیح کنید!</strong>' +
            '<ul><li ng-repeat="e in model.errors">' +
            '{{e.errorMessage}}' +
            '</li></ul></div>',
        replace: true,
        scope: {
            model: '=',
            showvalidation: '='
        },
        transclude: true,
        controller: function($scope, $element, $attrs) {
            this.model = $scope.model;
        }
    };
}]);
