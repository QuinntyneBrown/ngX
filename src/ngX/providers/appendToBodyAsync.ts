module ngX {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name appendToBodyAsync
     * @module ngX
     */
    export var appendToBodyAsync: any = (options: any) => {
        var deferred = $q.defer();
        document.body.appendChild(options.nativeElement);
        setTimeout(() => { deferred.resolve(); }, options.wait || 100);
        return deferred.promise;
    }

    angular.module("ngX").value("appendToBodyAsync", appendToBodyAsync);
} 