﻿module ngX {

    "use strict";

    var dispatcher = null;
    var $q = null;
    var invokeAsync = function (options) {
        if (!dispatcher) { dispatcher = angular.element(document.body).injector().get("dispatcher"); }
        if (!$q) { $q = angular.element(document.body).injector().get("$q"); }
        if (angular.isFunction(options)) { options = { action: options } };
        var deferred = $q.defer();
        var actionId = options.params ? options.action(options.params) : options.action();
        var listenerId = dispatcher.addListener({
            actionType: "CHANGE",
            callback: function (callbackOptions) {
                if (actionId === callbackOptions.id) {
                    dispatcher.removeListener({ id: listenerId });
                    deferred.resolve();
                }
            }
        });
        return deferred.promise;
    }

    angular.module("ngX").value("invokeAsync", invokeAsync);
}