module ngX {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    export var translateXAsync: ITranslateXAsync = (options: any) => {

        var deferred = $q.defer();

        angular.element(options.element).css({
            "-moz-transform": "translateX(" + options.x + "px)",
            "-webkit-transform": "translateX(" + options.x + "px)",
            "-ms-transform": "translateX(" + options.x + "px)",
            "-transform": "translateX(" + options.x + "px)"
        });

        options.element.addEventListener('transitionend', resolve, false);

        function resolve() {
            options.element.removeEventListener('transitionend', resolve);
            deferred.resolve();
        }

        return deferred.promise;

    };

    angular.module("ngX").value("translateXAsync", translateXAsync);
} 