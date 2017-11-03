(function() {
    "use strict";
    var app = angular.module("main");

    app.service("StorageService", function StorageService($mdToast) {
        var service = this;

        service.user = {};

        service.startUser = function startUser() {
        	service.user = new User();
        };

        service.showToast = function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .action('FECHAR')
                    .highlightAction(true)
                    .hideDelay(5000)
                    .position('bottom right')
            );
        }

        service.startUser();
	});
})();