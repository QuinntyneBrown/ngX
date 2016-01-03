module ngX {

    
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

            var directiveDefinitionObject: any = {
                restrict: options.restrict || "E",
                template: angular.isArray(options.template) ? options.template.join(" \n ") : options.template,
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
                directiveDefinitionObject.controller = function () { };
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
                styles = angular.isArray(styles) ? styles.join(" \n ") : styles;


                directiveDefinitionObject.compile = function () {
                    return {
                        pre: function (scope, element, attributes, controller, transcludeFn) {
                            if (options.transclude)
                                transcludeFn(scope, function (clone) {

                                });

                            if (!componentStyles[options.selector]) {
                                componentStyles[options.selector] = true;

                                function addStyleTagToHead() {
                                    var style = document.createElement("style");
                                    style.setAttribute("data-selector", options.selector)
                                    style.appendChild(document.createTextNode(styles));
                                    document.head.appendChild(style);
                                }

                                if (document.readyState === "complete" || document.readyState === 'interactive') {
                                    addStyleTagToHead();
                                }
                                else {
                                    function onDocumentLoad() {
                                        addStyleTagToHead();
                                        window.removeEventListener("DOMContentLoaded", onDocumentLoad);
                                    }
                                    window.addEventListener("DOMContentLoaded", onDocumentLoad);
                                }                                
                            }
                        },
                        post: function (scope: any) {

                            var $injector = angular.element(document.getElementsByTagName("body")[0]).injector();

                            var debounce: Function = <any>$injector.get("debounce");
                            var securityStore: any = <any>$injector.get("securityStore");
                            var dispatcher: any = <any>$injector.get("dispatcher");

                            if (scope && scope.vm) {
                                scope.vm.currentUser = securityStore.currentUser;
                            }

                            window.addEventListener("resize", function () {
                                if (scope.vm && scope.vm.onResize) {
                                    debounce(() => {

                                        scope.vm.onResize();

                                    }, 1000)();
                                }
                            });



                            if (options.properties) {
                                for (var prop in options.properties) {
                                    if (options.properties[prop].value)
                                        scope[prop] = options.properties[prop].value();
                                }

                            }

                            if (options.transclude && scope.vm.$transclude) {
                                scope.vm.$transclude(scope, (clone: ng.IAugmentedJQuery) => {
                                    scope.vm.clone = clone;
                                });
                            }

                            if (scope.vm && scope.vm.onInit)
                                scope.vm.onInit();


                            scope.$on("$routeUpdate", function () {
                                if (scope.vm && scope.vm.onRouteUpdate)
                                    scope.vm.onRouteUpdate();
                            });

                            if (scope.vm && scope.vm.storeOnChange) {
                                var listenerId = dispatcher.addListener({
                                    actionType: "CHANGE",
                                    callback: scope.vm.storeOnChange
                                });
                                scope.$on("$destroy", () => {
                                    dispatcher.removeListener({ id: listenerId });
                                });   
                            }
                                
                            

                            if (scope.vm && scope.vm.onKeyDown) {
                                document.addEventListener("keydown", scope.vm.onKeyDown);

                                scope.$on("$destroy", () => {
                                    document.removeEventListener("keydown", scope.vm.onKeyDown);
                                });
                            }

                            scope.$on("$locationChangeSuccess", () => {
                                if (scope.vm && scope.vm.onLocationChangeSuccess)
                                    scope.vm.onLocationChangeSuccess();
                            });

                            if (scope.vm && scope.vm.onVmUpdate) {
                                document.addEventListener("vmUpdate", scope.vm.onVmUpdate);

                                scope.$on("$destroy", () => {
                                    document.removeEventListener("vmUpdate", scope.vm.onVmUpdate);
                                });
                            }

                            if (scope.vm.dispose) {
                                scope.$on("$destroy", () => {
                                    scope.vm.dispose();
                                });
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

                if (options.template || options.templateUrl) {
                    angular.module(options.module).config(["$routeProvider", ($routeProvider) => {
                        var length = ngX.routeConfigs.length;
                        for (var i = 0; i < length; i++) {

                            var componentName = options.componentName || getFunctionName(options.component);

                            if (ngX.routeConfigs[i].config.componentName && ngX.routeConfigs[i].config.componentName === componentName) {
                                routeConfigs[i].config.templateUrl = options.templateUrl;
                                routeConfigs[i].config.template = angular.isArray(options.template) ? options.template.join(" \n ") : options.template;
                                $routeProvider.when(routeConfigs[i].when, routeConfigs[i].config);
                            }
                        }
                    }]);
                }

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

                if (options.styles) {
                    angular.module("ngX").run(["$rootScope", ($rootScope) => {
                        var styles = options.styles ? options.styles : options.component.styles;
                        styles = angular.isArray(styles) ? styles.join(" \n ") : styles;
                        var key = options.route;                        
                        $rootScope.$on("$routeChangeStart", function (currentRoute, nextRoute) {
                            if (nextRoute.$$route.originalPath == options.route) {
                                if (!componentStyles[key]) {
                                    componentStyles[key] = true;

                                    function addStyleTagToHead() {
                                        var style = document.createElement("style");
                                        style.setAttribute("data-selector", key)
                                        style.appendChild(document.createTextNode(styles));
                                        document.head.appendChild(style);
                                    }

                                    if (document.readyState === "complete" || document.readyState === 'interactive') {
                                        addStyleTagToHead();
                                    }
                                    else {
                                        function onDocumentLoad() {
                                            addStyleTagToHead();
                                            window.removeEventListener("DOMContentLoaded", onDocumentLoad);
                                        }
                                        window.addEventListener("DOMContentLoaded", onDocumentLoad);
                                    }
                                }
                            }                   
                        });
                    }]);

                }
            } catch (error) {

            }
        }

        if (!isBootstrapped) {
            angular.bootstrap(document, [options.module || "app"]);
        }
    }

} 