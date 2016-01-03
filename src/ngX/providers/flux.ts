module ngX {

    angular.module("ngX").run(["$injector", "$rootScope", "dispatcher", ($injector, $rootScope, dispatcher) => {
        $rootScope.$on("$viewContentLoaded", () => {            
        var $route: any = $injector.get("$route");
        var instance = $route.current.scope[$route.current.controllerAs];
        if (instance && instance.storeOnChange) {
            var listenerId = dispatcher.addListener({
                actionType: "CHANGE",
                callback: instance.storeOnChange
            });            
            $route.current.scope.$on("$destroy", () => {
                dispatcher.removeListener({ id: listenerId });
            });                
        }
        });        
    }]);

}