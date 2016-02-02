module ngX {

    angular.module("ngX").run(["$injector", "$rootScope", "store", ($injector, $rootScope, store) => {
        $rootScope.$on("$viewContentLoaded", () => {            
        var $route: any = $injector.get("$route");
        var scope = $route.current.scope;
        var instance = scope[$route.current.controllerAs];
        if (instance && instance.storeOnChange) 
            store.subscribe(state => {
                if (state) {
                    instance.storeOnChange(state);
                    scope.$digest();
                }
            });        

        });        
    }]);

}