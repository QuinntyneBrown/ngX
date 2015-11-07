﻿module ngX {

    
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

        /* supoort for polymer syntax*/

        options.selector = options.selector || options.is;

        if (options.selector) {

            var componentNameCamelCase = options.selector.replace(/-([a-z])/g, (g) => {
                return g[1].toUpperCase();
            });

            if (options.is)
                options.transclude = "element";

            var directiveDefinitionObject:any = {
                restrict: options.restrict || "E",
                template: options.template,
                templateUrl: options.templateUrl,
                replace: options.replace || true,
                scope: options.scope || {},     
                bindToController: options.bindToController || {},
                transclude: options.transclude           
            }

            if (options.component) {
                directiveDefinitionObject.controllerAs = "vm";
                directiveDefinitionObject.controller = options.componentName || componentNameCamelCase + "Component";
                options.component.$inject = options.providers;
            } else {
                directiveDefinitionObject.controllerAs = "vm";
                directiveDefinitionObject.controller = function () {};                
            }

            if (options.inputs && options.inputs.length > 0) {
                for (var i = 0; i < options.inputs.length; i++) {
                    directiveDefinitionObject.bindToController[options.inputs[i]] = "=";
                }
            }

            if (options.properties) {
                for (var prop in options.properties) {
                    if (options.properties[prop].type && options.properties[prop].type === Object) {
                        directiveDefinitionObject.bindToController[prop] = "=";
                    } else {
                        directiveDefinitionObject.bindToController[prop] = "@";
                    }
                        
                }                
            }

            if ((options.component && options.component.styles) || options.styles) {

                var styles = options.styles ? options.styles : options.component.styles;

                directiveDefinitionObject.compile = function() {
                    return {
                        pre: function (scope, element, attributes, controller, transcludeFn) {
                            if (options.transclude)
                                transcludeFn(scope, function(clone) {
                                    
                                });

                            if (!componentStyles[options.selector]) {
                                componentStyles[options.selector] = true;
                                document.addEventListener("DOMContentLoaded", onDocumentLoad);
                                function onDocumentLoad() {
                                    var head = document.getElementsByTagName("head");
                                    var augmentedJQuery = angular.element("<style>" + styles + "</style>");
                                    head[0].appendChild(augmentedJQuery[0]);
                                    document.removeEventListener("DOMContentLoaded", onDocumentLoad);
                                }
                            }
                        },
                        post: function (scope: any) {
                            if (options.properties) {
                                for (var prop in options.properties) {
                                    if (options.properties[prop].value)
                                        scope[prop] = options.properties[prop].value();
                                }

                            }
                        }
                    }
                }
            }



            angular.module(options.module).directive(componentNameCamelCase,
                [() => { return directiveDefinitionObject; }]);

            

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