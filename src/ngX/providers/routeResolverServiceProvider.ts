//http://odetocode.com/blogs/scott/archive/2014/03/24/dynamic-routes-with-angularjs.aspx

module ngX {

    "use strict";

    export var routeConfigs = [];

    /**
    * @name RouteResolverServiceProvider
    * @module ngX
    * @description Collect and execute route promises that should be resolve before a route is loaded
    */
    export class RouteResolverServiceProvider implements IRouteResolverServiceProvider {

        public configure = (routePromise: IRoutePromise) => { this._routePromises.push(routePromise); }

        public $get = ["$injector", "$q", ($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
            return {
                resolve: (routeName: string, routeParams?: ng.route.IRouteParamsService) => {
                    this.routeParams = routeParams;
                    var deferred = $q.defer();
                    var resolvedRouteData: any = {};
                    var routePromises = this.getRoutePromisesByRouteName(routeName);

                    if (routePromises.length < 1)
                        return $q.when(true);

                    var prioritizedGroups = this.reduceRoutePromisesByPriority(routePromises);

                    this.invoke($injector, $q, prioritizedGroups, 0, () => {
                        deferred.resolve(resolvedRouteData);
                    }, resolvedRouteData);

                    return deferred.promise;
                }
            }
        }
        ];

        /* @internal */
        private _routePromises: Array<IRoutePromise> = [];

        private routeParams: any;

        /**
         * get route promises ordered by priority (ASC)
         * priority 1 runs before priority 10
         */
        public get routePromises() {
            return this._routePromises.sort((a: IRoutePromise, b: IRoutePromise) => {
                return a.priority - b.priority;
            });
        }

        /**
        * @name getRoutePromisesByRouteName
        * @description the route promises that will be resolved on an route
        * if the value of the route key matches the route definition '/foo/{id}' or '/foos'
        * include that routePromises
        * if they is no specific route mention, it's assumed you want that promise to be resolved on
        * every route
        */
        private getRoutePromisesByRouteName = (route: string) => {
            return this._routePromises.filter((routePromise: IRoutePromise) => {
                if (routePromise.route)
                    return routePromise.route === route;

                if (routePromise.routes)
                    return routePromise.routes.indexOf(route) > -1;

                return true;
            });
        }

        /**
         * Reduce RoutePromises into prioritized groups
         * Put the route promises with the same priority in the same group
         * Eventually will be resolve together asynchronously with $q.all
         */
        public reduceRoutePromisesByPriority = (routePromises: IRoutePromise[]) => {
            var priorities: Array<number> = [];
            var routePromisesPrioritizedGroups: Array<any> = [];

            routePromises.forEach((promise) => {
                if (priorities.indexOf(promise.priority) < 0)
                    priorities.push(promise.priority);
            });

            priorities.forEach((priority: number, index: number) => {
                routePromisesPrioritizedGroups.push({
                    promises: routePromises.filter((promise) => { return promise.priority == priority; }),
                    priority: priority,
                    isLast: index == priorities.length - 1
                });
            });
            return routePromisesPrioritizedGroups;
        }

        /**
         * Invoke the grouped promises. Reducing the results into the resolvedRouteData object
         * If the route promise inside the group has a key defined, the result will be attached to the 
         * resolved object (routeData) using that key
         * After you reach the last group, call the callback that will resolve the object that 
         * will have a key value dictionary with the results of any promises with a key defined
         */
        public invoke = ($injector: ng.auto.IInjectorService, $q: ng.IQService, groups: IRoutePromisesPrioritizedGroup[], currentGroupIndex: number, callback: any, resolvedRouteData: any) => {
            var excutedPromises: Array<any> = [];
            var currentGroup = groups[currentGroupIndex];

            currentGroup.promises.forEach((statePromise: IRoutePromise) => {
                excutedPromises.push($injector.invoke(statePromise.promise));
            });

            $q.all(excutedPromises).then((results) => {
                results.forEach((result, index) => {
                    if (currentGroup.promises[index].key)
                        resolvedRouteData[currentGroup.promises[index].key] = results[index];
                });
                currentGroup.isLast ? callback() : this.invoke($injector, $q, groups, currentGroupIndex + 1, callback, resolvedRouteData);
            });
        }
    }

    try {
        angular.module("ngRoute");

        angular.module("ngX")
            .provider("routeResolverService", [RouteResolverServiceProvider])

        /**
         * Attach the routeResolverService resolve method to every route
         * Also enable syntax sugar to ease transition to Angular 2
         */
            .config(["$routeProvider", ($routeProvider: any) => {

                $routeProvider.buildFromUrl = (options: any) => {
                    var routes = JSON.parse(ngX.getFromUrlSync({ url: options.url }));
                    for (var i = 0; i < routes.length; i++) {
                        $routeProvider.when(routes[i].when, routes[i].config);
                    }
                }

                var whenFn = $routeProvider.when;
                $routeProvider.when = function () {

                    if (arguments[1] && arguments[0]) {
                        var path = arguments[0];
                        arguments[1].templateUrl = arguments[1].componentTemplateUrl || arguments[1].templateUrl;
                        arguments[1].controller = arguments[1].componentName || arguments[1].controller;
                        arguments[1].controllerAs = "vm";
                        arguments[1].reloadOnSearch = arguments[1].reloadOnSearch || false;

                        if (arguments[1].componentName && !arguments[1].templateUrl)
                            arguments[1].templateUrl = ngX.getTemplateUrlFromComponentName({
                                moduleName: arguments[1].moduleName,
                                componentName: arguments[1].componentName
                            });
                        arguments[1].resolve = arguments[1].resolve || {};

                        angular.extend(arguments[1].resolve, {
                            routeData: [
                                "routeResolverService", (routeResolverService: ngX.IRouteResolverService) => {
                                    return routeResolverService.resolve(path);
                                }
                            ]
                        });
                    }

                    routeConfigs.push({
                        when: arguments[0],
                        config: arguments[1]
                    });

                    whenFn.apply($routeProvider, arguments);

                    return $routeProvider;
                }
            }])
            .run(["$injector", "$location", "$rootScope", "$route", "loginRedirect", "fire", "securityStore", (
                $injector: ng.auto.IInjectorService,
                $location: ng.ILocationService,
                $rootScope: ng.IRootScopeService,
                $route: ng.route.IRouteService,
                loginRedirect: any,
                fire: any, 
                securityStore: any) => {
                $rootScope.$on("$viewContentLoaded", () => {
                    var $route: any = $injector.get("$route");
                    var instance = $route.current.scope[$route.current.controllerAs];
                    if (instance.onInit) instance.onInit();

                    instance.onChildUpdated = (event: any) => {
                        fire(document, "vmUpdate", {
                            model: event.model,
                            action: event.action
                        });
                    }

                    document.addEventListener("modelUpdate", instance.onChildUpdated);

                    $route.current.scope.$on("$destroy", () => {
                        document.removeEventListener("modelUpdate", instance.onChildrenUpdated);
                    });
                });

                $rootScope.$on("$routeChangeStart", function (currentRoute, nextRoute) {

                    if (nextRoute.$$route.authorizationRequired && !securityStore.token) {
                        $rootScope.$evalAsync(() => {
                            loginRedirect.redirectToLogin();
                        });                        
                    }

                    if ($location.path() === "/login") {
                        securityStore.token = null;
                    }
                });

                $rootScope.$on("$routeChangeStart", (event, next, current) => {

                    $rootScope["isNavigating"] = true;
                    /**
                    * if routes contain /login then assume every route authorization is required except for /login
                    */

                    if ($location.path() === "/login") {
                        securityStore.token = null;
                    }

                    if ($route.routes["/login"]) {


                    } else {

                    }

                    var instance = current && current.controllerAs && current.scope ? current.scope[current.controllerAs] : null;
                    if (instance && instance.canDeactivate && !instance.deactivated) {
                        event.preventDefault();
                        instance.canDeactivate().then((canDeactivate: boolean) => {
                            if (canDeactivate) {
                                instance.deactivated = true;
                                $location.path(next.originalPath);
                            }
                        });
                    } else {
                        if (instance && instance.deactivate)
                            instance.deactivate();
                    }
                });
            }]);
    } catch (error) {

    }
} 