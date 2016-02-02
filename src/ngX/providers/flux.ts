module ngX {

    angular.module("ngX").run(["$injector", "$rootScope", "store", ($injector, $rootScope, store) => {
        $rootScope.$on("$viewContentLoaded", () => {            
        var $route: any = $injector.get("$route");
        var instance = $route.current.scope[$route.current.controllerAs];
        if (instance && instance.storeOnChange) 
            store.subscribe(instance.storeOnChange);                
        
        });        
    }]);

}