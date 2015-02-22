var app = angular.module('app', [
            'breeze.angular'
]);

app.run(['breeze', function (breeze) { }]);

app.value('metadata', function() {
        return JSON.parse($.ajax('api/metadata/metadatas', { async: false }).responseText);
    }()
);

angular.module('app')
    .factory('entityManagerFactory', ['breeze','metadata', emFactory]);

function emFactory(breeze, metadata) {
    var serviceRoot = window.location.protocol + '//' + window.location.host + '/';
    var serviceName = serviceRoot + 'api/Person'; // breeze Web API controller

    // the "factory" services exposes two members
    var factory = {
        newManager: function () {

            //metadata = JSON.parse($.ajax('api/metadata/metadatas', { async: false }).responseText);
            var store = set(metadata, "api/person");
            var mngr = new breeze.EntityManager({
                serviceName: serviceName,
                metadataStore: store
            });

            validation().set(mngr, metadata);
            return mngr;
        },
        serviceName: serviceName
    };

    return factory;
}