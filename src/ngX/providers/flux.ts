module ngX {

    angular.module("ngX").run(["$injector", "$rootScope", ($injector, $rootScope) => {
        $rootScope.$on("$viewContentLoaded", () => {            
        var $route: any = $injector.get("$route");
        var instance = $route.current.scope[$route.current.controllerAs];
        if (instance && instance.onStoreUpdate) {
            $route.current.scope.$on("STORE_UPDATE", instance.onStoreUpdate);                
        }
        });


    }]);

}