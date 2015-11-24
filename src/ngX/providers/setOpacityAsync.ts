module ngX {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name setOpacityAsync
     * @module ngX
     */
    export var setOpacityAsync = (options: any) => {
        var deferred = $q.defer();
        if (options.nativeHtmlElement) {
            options.nativeHtmlElement.style.opacity = options.opacity;
            options.nativeHtmlElement.addEventListener('transitionend', resolve, false);
        }
        function resolve() {
            options.nativeHtmlElement.removeEventListener('transitionend', resolve);
            deferred.resolve();
        }
        return deferred.promise;
    }

    angular.module("ngX").value("setOpacityAsync", setOpacityAsync);
} 