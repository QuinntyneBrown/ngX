module ngX {

    var componentStyles = {};
    /**
    * @name Component
    * @description syntax sugar to ease transition to angular 2
    * @requires App.Common.RouteResolverServiceProvider
    */
    export var Component = (options: any) => {

        if (!isBootstrapped) {
            var ngScopes = document.querySelectorAll('[ng-app]');

            if (ngScopes.length < 1)
                ngScopes = document.querySelectorAll('[data-ng-app]');

            if (ngScopes.length < 1) {
                angular.module("app", ["ngX"]);
            } else {
                isBootstrapped = true;
            }
        }

        options.module = options.module || "app";

        if (options.selector) {

            var componentNameCamelCase = options.selector.replace(/-([a-z])/g, (g) => {
                return g[1].toUpperCase();
            });



            var directiveDefinitionObject:any = {
                controllerAs: "vm",
                controller: options.componentName || componentNameCamelCase + "Component",
                restrict: options.restrict || "E",
                template: options.template,
                templateUrl: options.templateUrl,
                replace: options.replace || true,
                scope: options.scope || {},     
                transclude: options.transclude           
            }

            if (options.inputs && options.inputs.length > 0) {
                for (var i = 0; i < options.inputs.length; i++) {
                    directiveDefinitionObject.scope[options.inputs[i]] = "=";
                }
            }

            if (options.component.styles) {
                directiveDefinitionObject.compile = function() {
                    return {
                        pre: function (scope, element, attributes, controller, transcludeFn) {
                            if (!componentStyles[options.selector]) {
                                componentStyles[options.selector] = true;

                                document.addEventListener("DOMContentLoaded", onDocumentLoad);

                                function onDocumentLoad() {
                                    var head = document.getElementsByTagName("head");
                                    var augmentedJQuery = angular.element("<style>" + options.component.styles + "</style>");
                                    head[0].appendChild(augmentedJQuery[0]);
                                    document.removeEventListener("DOMContentLoaded", onDocumentLoad);
                                }
                            }
                        },
                    }
                }
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
                .controller(options.componentName || getFunctionName(options.component), options.component);

            try {
                angular.module("ngRoute");

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
            } catch (error) {
                
            }
        }

        if (!isBootstrapped) {
            angular.bootstrap(document, [options.module || "app"]);
        }
    }

} 