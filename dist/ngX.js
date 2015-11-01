angular.module("ngX", []);

//# sourceMappingURL=ngX.module.js.map

var ngX;
(function (ngX) {
    /**
    * @name Component
    * @description syntax sugar to ease transition to angular 2
    * @requires App.Common.RouteResolverServiceProvider
    */
    ngX.Component = function (options) {
        if (options.template || options.templateUrl) {
            var componentNameCamelCase = options.selector.replace(/-([a-z])/g, function (g) {
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
            };
            angular.module(options.module).directive(componentNameCamelCase, [function () { return directiveDefinitionObject; }]);
            options.component.$inject = options.providers;
            angular.module(options.module).controller(options.componentName || componentNameCamelCase + "Component", options.component);
        }
        else if (options.dynamic) {
            options.component.$inject = options.providers;
            angular.module(options.module).service(options.componentName, options.component);
        }
        else {
            options.component.$inject = options.providers;
            angular.module(options.module)
                .controller(options.componentName, options.component);
            if (options.component.canActivate)
                angular.module(options.module)
                    .config([
                    "routeResolverServiceProvider", function (routeResolverServiceProvider) {
                        routeResolverServiceProvider.configure({
                            route: options.route,
                            routes: options.routes,
                            key: options.key,
                            promise: options.component.canActivate()
                        });
                    }
                ]);
        }
    };
})(ngX || (ngX = {}));

//# sourceMappingURL=component.js.map

var ngX;
(function (ngX) {
    "use strict";
    /**
    * @name RouteResolverServiceProvider
    * @module ngX
    * @description Collect and execute route promises that should be resolve before a route is loaded
    */
    var RouteResolverServiceProvider = (function () {
        function RouteResolverServiceProvider() {
            var _this = this;
            this.configure = function (routePromise) { _this._routePromises.push(routePromise); };
            this.$get = ["$injector", "$q", function ($injector, $q) {
                    return {
                        resolve: function (routeName, routeParams) {
                            _this.routeParams = routeParams;
                            var deferred = $q.defer();
                            var resolvedRouteData = {};
                            var routePromises = _this.getRoutePromisesByRouteName(routeName);
                            if (routePromises.length < 1)
                                return $q.when(true);
                            var prioritizedGroups = _this.reduceRoutePromisesByPriority(routePromises);
                            _this.invoke($injector, $q, prioritizedGroups, 0, function () {
                                deferred.resolve(resolvedRouteData);
                            }, resolvedRouteData);
                            return deferred.promise;
                        }
                    };
                }
            ];
            /* @internal */
            this._routePromises = [];
            /**
            * @name getRoutePromisesByRouteName
            * @description the route promises that will be resolved on an route
            * if the value of the route key matches the route definition '/foo/{id}' or '/foos'
            * include that routePromises
            * if they is no specific route mention, it's assumed you want that promise to be resolved on
            * every route
            */
            this.getRoutePromisesByRouteName = function (route) {
                return _this._routePromises.filter(function (routePromise) {
                    if (routePromise.route)
                        return routePromise.route === route;
                    if (routePromise.routes)
                        return routePromise.routes.indexOf(route) > -1;
                    return true;
                });
            };
            /**
             * Reduce RoutePromises into prioritized groups
             * Put the route promises with the same priority in the same group
             * Eventually will be resolve together asynchronously with $q.all
             */
            this.reduceRoutePromisesByPriority = function (routePromises) {
                var priorities = [];
                var routePromisesPrioritizedGroups = [];
                routePromises.forEach(function (promise) {
                    if (priorities.indexOf(promise.priority) < 0)
                        priorities.push(promise.priority);
                });
                priorities.forEach(function (priority, index) {
                    routePromisesPrioritizedGroups.push({
                        promises: routePromises.filter(function (promise) { return promise.priority == priority; }),
                        priority: priority,
                        isLast: index == priorities.length - 1
                    });
                });
                return routePromisesPrioritizedGroups;
            };
            /**
             * Invoke the grouped promises. Reducing the results into the resolvedRouteData object
             * If the route promise inside the group has a key defined, the result will be attached to the
             * resolved object (routeData) using that key
             * After you reach the last group, call the callback that will resolve the object that
             * will have a key value dictionary with the results of any promises with a key defined
             */
            this.invoke = function ($injector, $q, groups, currentGroupIndex, callback, resolvedRouteData) {
                var excutedPromises = [];
                var currentGroup = groups[currentGroupIndex];
                currentGroup.promises.forEach(function (statePromise) {
                    excutedPromises.push($injector.invoke(statePromise.promise));
                });
                $q.all(excutedPromises).then(function (results) {
                    results.forEach(function (result, index) {
                        if (currentGroup.promises[index].key)
                            resolvedRouteData[currentGroup.promises[index].key] = results[index];
                    });
                    currentGroup.isLast ? callback() : _this.invoke($injector, $q, groups, currentGroupIndex + 1, callback, resolvedRouteData);
                });
            };
        }
        Object.defineProperty(RouteResolverServiceProvider.prototype, "routePromises", {
            /**
             * get route promises ordered by priority (ASC)
             * priority 1 runs before priority 10
             */
            get: function () {
                return this._routePromises.sort(function (a, b) {
                    return a.priority - b.priority;
                });
            },
            enumerable: true,
            configurable: true
        });
        return RouteResolverServiceProvider;
    })();
    ngX.RouteResolverServiceProvider = RouteResolverServiceProvider;
    angular.module("ngX")
        .provider("routeResolverService", [RouteResolverServiceProvider])
        .config(["$routeProvider", function ($routeProvider) {
            var whenFn = $routeProvider.when;
            $routeProvider.when = function () {
                if (arguments[1] && arguments[0]) {
                    var path = arguments[0];
                    arguments[1].templateUrl = arguments[1].componentTemplateUrl || arguments[1].templateUrl;
                    arguments[1].controller = arguments[1].componentName || arguments[1].controller;
                    arguments[1].controllerAs = "vm";
                    arguments[1].resolve = {
                        routeData: ["routeResolverService", function (routeResolverService) {
                                return routeResolverService.resolve(path);
                            }]
                    };
                }
                whenFn.apply($routeProvider, arguments);
            };
        }])
        .run(["$injector", "$location", "$rootScope", function ($injector, $location, $rootScope) {
            $rootScope.$on("$viewContentLoaded", function () {
                var $route = $injector.get("$route");
                var instance = $route.current.scope[$route.current.controllerAs];
                if (instance.onInit)
                    instance.onInit();
            });
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                var instance = current && current.controllerAs ? current.scope[current.controllerAs] : null;
                if (instance && instance.canDeactivate && !instance.deactivated) {
                    event.preventDefault();
                    instance.canDeactivate().then(function (canDeactivate) {
                        if (canDeactivate) {
                            instance.deactivated = true;
                            $location.path(next.originalPath);
                        }
                    });
                }
                else {
                    if (instance && instance.deactivate)
                        instance.deactivate();
                }
            });
        }]);
})(ngX || (ngX = {}));

//# sourceMappingURL=routeResolverServiceProvider.js.map
