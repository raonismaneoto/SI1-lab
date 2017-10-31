(function() {
    "use strict";
    var app = angular.module("main");

    app.service("StorageService", function StorageService() {
        var service = this;

        service.user = {};

        service.startUser = function startUser() {
        	service.user = new User();
        };

        service.startUser();
	});
})();