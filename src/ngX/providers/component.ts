module ngX {

    /**
    * @name Component
    * @description syntax sugar to ease transition to angular 2
    * @requires App.Common.RouteResolverServiceProvider
    */
    export var Component = (options: any) => {

        if (options.template || options.templateUrl) {

            var componentNameCamelCase = options.selector.replace(/-([a-z])/g, (g) => {
                return g[1].toUpperCase();
            });

            var directiveDefinitionObject = {
                controllerAs: "vm",
                controller: options.componentName || componentNameCamelCase + "Component",
                restrict: options.restrict || "E",
                template: options.template,
                templateUrl: options.templateUrl,
                replace: options.replace || true,
                scope: options.scope || {}
            }

            angular.module(options.module).directive(componentNameCamelCase,
                [() => { return directiveDefinitionObject; }]);

            options.component.$inject = options.providers;

            angular.module(options.module).controller(options.componentName || componentNameCamelCase + "Component", options.component);

        } else if (options.dynamic) {
            options.component.$inject = options.providers;
            angular.module(options.module).service(options.componentName, options.component);
        } else {

            options.component.$inject = options.providers;

            angular.module(options.module)
                .controller(options.componentName, options.component);

            if (options.component.canActivate)
                angular.module(options.module)
                    .config([
                        "routeResolverServiceProvider", (routeResolverServiceProvider: IRouteResolverServiceProvider) => {
                            routeResolverServiceProvider.configure({
                                route: options.route,
                                routes: options.routes,
                                key: options.key,
                                promise: options.component.canActivate()
                            });
                        }
                    ]);
        }
    }

} 