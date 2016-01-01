module ngX {

    export var ConfigureRoutePromise = (options: any) => {

        if (angular.isFunction(options))
            options = { promise: options }
        
        var app = angular.module(options.module || "app");    
        var promiseDefinition = options.providers ? options.providers : getParameterNames(options.promise);
        promiseDefinition.push(options.promise);        
        app.config([
        "routeResolverServiceProvider", function (routeResolverServiceProvider) {
            routeResolverServiceProvider.configure({
                priority: options.promise.priority || '0',
                promise: promiseDefinition,
                route: options.route,
                routes: options.routes,
                excludedRoutes: options.excludedRoutes
            });
        }
    ]);
    }

}