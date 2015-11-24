module ngX {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name extendCssAsync
     * @module ngX
     */
    export var extendCssAsync = (options: any) => {
        return $q.when(angular.extend(options.nativeHTMLElement.style, options.cssObject));
    }

    angular.module("ngX").value("extendCssAsync", extendCssAsync);
} 