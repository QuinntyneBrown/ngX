var ngX;
(function (ngX) {
    ngX.componentStyles = {};
    ngX.isBootstrapped = false;
})(ngX || (ngX = {}));
function isAngularPresent() {
    return typeof angular === 'object';
}
if (isAngularPresent() === false) {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.js');
    document.head.appendChild(scriptTag);
}
try {
    angular.module("ngRoute");
    angular.module("ngX", ["ngRoute"]);
}
catch (error) {
    angular.module("ngX", []);
}
angular.module("ngX.components", ["ngX"]);

//# sourceMappingURL=ngX.module.js.map



//# sourceMappingURL=hamburgerButton.js.map

var ngX;
(function (ngX) {
    var Components;
    (function (Components) {
        "use strict";
        /**
         * @name Rotator
         * @description
         */
        var Rotator = (function () {
            function Rotator($attrs, $compile, $element, $http, $interval, $q, $scope, $timeout, $transclude, getHtml, getX, translateX, translateXAsync) {
            }
            return Rotator;
        })();
        angular.module("ngX.components").controller("rotatorController", [
            "$attrs",
            "$compile",
            "$element",
            "$http",
            "$interval",
            "$q",
            "$scope",
            "$timeout",
            "$transclude",
            "getHtml",
            "getX",
            "translateX",
            "translateXAsync",
            Rotator
        ]);
        var styles = [
            " .rotator .slide { ",
            "   transition: transform 0.5s cubic-bezier(0.1, 0.1, 0.25, 0.9); } ",
            " .rotator .notransistion.slide { ",
            "  transition: none !important; } ",
            " .rotator .view-port { ",
            "   position: relative; ",
            "   overflow-x: hidden; ",
            "   overflow-y: hidden; ",
            "   width: 750px; ",
            " } ",
            " .rotator .view-port .previous-arrow img, ",
            " .rotator .view-port .next-arrow img { ",
            "   position: absolute; ",
            "   top: calc(50% - 40px); ",
            "   cursor: pointer; ",
            "   left: 0; ",
            "   z-index: 999; ",
            "   opacity: .4; ",
            "   transition: opacity .500s; } ",
            " .rotator .view-port .next-arrow img { ",
            "   left: calc(100% - 80px); } ",
            " .rotator .view-port .container { ",
            "   width: 99999px; } ",
            " .rotator .view-port .previous-arrow img:hover, ",
            " .rotator .view-port .next-arrow img:hover { ",
            "   opacity: .7; } ",
            " .rotator .view-port .slide { ",
            "   position: relative; ",
            "   float: left; ",
            "   margin: 0 auto; } "
        ].join("\n");
        angular.module("ngX.components").directive("rotator", [
            function () {
                return {
                    restrict: "E",
                    replace: true,
                    transclude: "element",
                    controller: "rotatorContrller",
                    controllerAs: "vm",
                    scope: {
                        previousButtonImageUrl: "@",
                        nextButtonImageUrl: "@"
                    },
                    compile: function () {
                        pre: (function () {
                            if (!ngX.componentStyles["rotator"]) {
                                ngX.componentStyles["rotator"] = true;
                                document.addEventListener("DOMContentLoaded", onDocumentLoad);
                                function onDocumentLoad() {
                                    var head = document.getElementsByTagName("head");
                                    var augmentedJQuery = angular.element("<style>" + styles + "</style>");
                                    head[0].appendChild(augmentedJQuery[0]);
                                    document.removeEventListener("DOMContentLoaded", onDocumentLoad);
                                }
                            }
                        });
                    },
                    template: [
                        "<div rotator class='rotator'>",
                        "<div class='view-port'>",
                        "<div class='previous-arrow' data-ng-click='vm.onPrevious()'><img data-ng-src='{{ ::previousButtonImageUrl }}'/></div>",
                        "<div class='next-arrow' data-ng-click='vm.onNext()'><img data-ng-src='{{ ::nextButtonImageUrl }}'/></div>",
                        "<div class='container'>",
                        "</div>",
                        "</div>",
                        "</div>"
                    ].join(" ")
                };
            }
        ]);
    })(Components = ngX.Components || (ngX.Components = {}));
})(ngX || (ngX = {}));

//# sourceMappingURL=rotator.js.map

var ngX;
(function (ngX) {
    "use strict";
    /**
     * @name ApiEndpointProvider
     */
    var ApiEndpointProvider = (function () {
        function ApiEndpointProvider() {
            var _this = this;
            this.config = {
                getBaseUrl: function (name) {
                    var baseUrl = "";
                    if (name) {
                        _this.config.baseUrls.forEach(function (endpointDefinition) {
                            if (name === endpointDefinition.name) {
                                baseUrl = endpointDefinition.url;
                            }
                        });
                    }
                    if (!name || baseUrl === "") {
                        _this.config.baseUrls.forEach(function (endpointDefinition) {
                            if (!endpointDefinition.name && baseUrl === "") {
                                baseUrl = endpointDefinition.url;
                            }
                        });
                    }
                    return baseUrl;
                },
                baseUrls: [],
                configure: function (baseUrl, name) {
                    var self = this;
                    self.baseUrls.push({ url: baseUrl, name: name });
                }
            };
        }
        ApiEndpointProvider.prototype.configure = function (baseUrl, name) {
            this.config.baseUrls.push({ url: baseUrl, name: name });
        };
        ApiEndpointProvider.prototype.$get = function () {
            return this.config;
        };
        return ApiEndpointProvider;
    })();
    ngX.ApiEndpointProvider = ApiEndpointProvider;
    angular.module("ngX").provider("apiEndpoint", ApiEndpointProvider);
})(ngX || (ngX = {}));

//# sourceMappingURL=apiEndpointProvider.js.map

var ngX;
(function (ngX) {
    ngX.appModuleName = "app";
})(ngX || (ngX = {}));

//# sourceMappingURL=appModuleName.js.map

var ngX;
(function (ngX) {
    /**
    * @name Component
    * @description syntax sugar to ease transition to angular 2
    * @requires App.Common.RouteResolverServiceProvider
    */
    ngX.Component = function (options) {
        if (!ngX.isBootstrapped) {
            var ngScopes = document.querySelectorAll('[ng-app]');
            if (ngScopes.length < 1)
                ngScopes = document.querySelectorAll('[data-ng-app]');
            if (ngScopes.length < 1) {
                angular.module("app", ["ngX"]);
            }
            else {
                ngX.isBootstrapped = true;
            }
        }
        options.module = options.module || "app";
        /* supoort for polymer syntax*/
        options.selector = options.selector || options.is;
        if (options.selector) {
            var componentNameCamelCase = options.selector.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
            if (options.is)
                options.transclude = "element";
            var directiveDefinitionObject = {
                restrict: options.restrict || "E",
                template: options.template,
                templateUrl: options.templateUrl,
                replace: options.replace || true,
                scope: options.scope || {},
                bindToController: options.bindToController || {},
                transclude: options.transclude
            };
            if (options.component) {
                directiveDefinitionObject.controllerAs = "vm";
                directiveDefinitionObject.controller = options.componentName || componentNameCamelCase + "Component";
                options.component.$inject = options.providers;
            }
            else {
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
                    }
                    else {
                        directiveDefinitionObject.bindToController[prop] = "@";
                    }
                }
            }
            if ((options.component && options.component.styles) || options.styles) {
                var styles = options.styles ? options.styles : options.component.styles;
                directiveDefinitionObject.compile = function () {
                    return {
                        pre: function (scope, element, attributes, controller, transcludeFn) {
                            if (options.transclude)
                                transcludeFn(scope, function (clone) {
                                });
                            if (!ngX.componentStyles[options.selector]) {
                                ngX.componentStyles[options.selector] = true;
                                document.addEventListener("DOMContentLoaded", onDocumentLoad);
                                function onDocumentLoad() {
                                    var head = document.getElementsByTagName("head");
                                    var augmentedJQuery = angular.element("<style>" + styles + "</style>");
                                    head[0].appendChild(augmentedJQuery[0]);
                                    document.removeEventListener("DOMContentLoaded", onDocumentLoad);
                                }
                            }
                        },
                        post: function (scope) {
                            if (options.properties) {
                                for (var prop in options.properties) {
                                    if (options.properties[prop].value)
                                        scope[prop] = options.properties[prop].value();
                                }
                            }
                            if (scope.vm && scope.vm.onInit)
                                scope.vm.onInit();
                            scope.$on("$routeUpdate", function () {
                                if (scope.vm && scope.vm.onRouteUpdate)
                                    scope.vm.onRouteUpdate();
                            });
                            if (scope.vm && scope.vm.onVmUpdate) {
                                document.addEventListener("vmUpdate", scope.vm.onVmUpdate);
                                scope.$on("$destroy", function () {
                                    document.removeEventListener("vmUpdate", scope.vm.onVmUpdate);
                                });
                            }
                        }
                    };
                };
            }
            angular.module(options.module).directive(componentNameCamelCase, [function () { return directiveDefinitionObject; }]);
            angular.module(options.module).controller(options.componentName || componentNameCamelCase + "Component", options.component);
        }
        else if (options.dynamic) {
            options.component.$inject = options.providers;
            angular.module(options.module).service(options.componentName, options.component);
        }
        else {
            options.component.$inject = options.providers;
            angular.module(options.module)
                .controller(options.componentName || ngX.getFunctionName(options.component), options.component);
            try {
                angular.module("ngRoute");
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
            catch (error) {
            }
        }
        if (!ngX.isBootstrapped) {
            angular.bootstrap(document, [options.module || "app"]);
        }
    };
})(ngX || (ngX = {}));

//# sourceMappingURL=component.js.map

var ngX;
(function (ngX) {
    ngX.Configure = function (options) {
        if (options.templateMappingFn)
            ngX.getTemplateUrlFromComponentName = options.templateMappingFn;
        if (options.appModuleName)
            ngX.appModuleName = options.appModuleName;
    };
})(ngX || (ngX = {}));

//# sourceMappingURL=configure.js.map

var ngX;
(function (ngX) {
    /**
     * @name DataService
     * @module ngX
     */
    var DataService = (function () {
        function DataService($http, $q) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.inMemoryCache = {};
            this.fromServiceOrCache = function (options) {
                var deferred = _this.$q.defer();
                _this.$http({ method: options.method, url: options.url }).then(function (results) {
                    deferred.resolve(results);
                });
                return deferred.promise;
            };
            this.fromService = function (options) {
                var deferred = _this.$q.defer();
                _this.$http({ method: options.method, url: options.url, data: options.data, params: options.params }).then(function (results) {
                    deferred.resolve(results);
                });
                return deferred.promise;
            };
            this.invalidateCache = function () {
                _this.inMemoryCache = {};
            };
        }
        return DataService;
    })();
    ngX.DataService = DataService;
    angular.module("ngX").service("dataService", ["$http", "$q", DataService]);
})(ngX || (ngX = {}));

//# sourceMappingURL=dataService.js.map

var ngX;
(function (ngX) {
    "use strict";
    // Extracted from Underscore.js 1.5.2
    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        return function () {
            context = this;
            args = arguments;
            timestamp = new Date();
            var later = function () {
                var last = (new Date()) - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                }
                else {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                    }
                }
            };
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
            }
            return result;
        };
    }
    angular.module("ngX").value("debounce", debounce);
})(ngX || (ngX = {}));

//# sourceMappingURL=debounce.js.map

var ngX;
(function (ngX) {
    "use strict";
    angular.module("ngX").value("fire", function (target, type, properties) {
        var htmlEvent = document.createEvent("HTMLEvents");
        htmlEvent.initEvent(type, true, true);
        for (var j in properties) {
            htmlEvent[j] = properties[j];
        }
        target.dispatchEvent(htmlEvent);
    });
})(ngX || (ngX = {}));

//# sourceMappingURL=fire.js.map

var ngX;
(function (ngX) {
    ngX.getFunctionName = function (fun) {
        var ret = fun.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));
        return ret[0].toLowerCase() + ret.substr(1);
    };
})(ngX || (ngX = {}));

//# sourceMappingURL=getFunctionName.js.map

var ngX;
(function (ngX) {
    "use strict";
    var getHtml = function (who, deep) {
        if (!who || !who.tagName)
            return '';
        var txt, ax, el = document.createElement("div");
        el.appendChild(who.cloneNode(false));
        txt = el.innerHTML;
        if (deep) {
            ax = txt.indexOf('>') + 1;
            txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
        }
        el = null;
        return txt;
    };
    angular.module("ngX").value("getHtml", getHtml);
})(ngX || (ngX = {}));

//# sourceMappingURL=getHtml.js.map

var ngX;
(function (ngX) {
    ngX.getTemplateUrlFromComponentName = function (options) {
        if (options.componentName.length > 9) {
            if (options.componentName.substr(options.componentName.length - 9) === "Component") {
                var componentTemplateFileName = options.componentName.substr(0, options.componentName.length - 9) + ".component.html";
                if (options.moduleName)
                    return "/src/" + options.moduleName + "/components/" + componentTemplateFileName;
                return "/src/" + ngX.appModuleName + "/components/" + componentTemplateFileName;
            }
        }
    };
})(ngX || (ngX = {}));

//# sourceMappingURL=getTemplateUrlFromComponentName.js.map

var ngX;
(function (ngX) {
    ngX.getX = function (element) {
        var transform = angular.element(element).css("transform");
        if (transform === "none")
            return 0;
        var result = JSON.parse(transform.replace(/^\w+\(/, "[").replace(/\)$/, "]"));
        return JSON.parse(transform.replace(/^\w+\(/, "[").replace(/\)$/, "]"))[4];
    };
    angular.module("ngX").value("getX", ngX.getX);
})(ngX || (ngX = {}));

//# sourceMappingURL=getX.js.map

var ngX;
(function (ngX) {
    ngX.newGuid = function () {
    };
})(ngX || (ngX = {}));

//# sourceMappingURL=guid.js.map

// add model registration with change notifications firing after save method or update method  

//# sourceMappingURL=model.js.map

var ngX;
(function (ngX) {
    "use strict";
    /**
    * @name RenderedNodes
    * @module ngX
    * @description
    */
    var RenderedNodes = (function () {
        function RenderedNodes(getX) {
            var _this = this;
            this.getX = getX;
            this.createInstance = function (options) {
                var instance = new RenderedNodes(_this.getX);
                instance.containerNavtiveElement = options.containerNavtiveElement;
                return instance;
            };
            this.getAll = function (options) {
                var direction;
                switch (options.orientation) {
                    case "horizontal":
                        direction = "left";
                        break;
                    default:
                        direction = "top";
                        break;
                }
                switch (options.order) {
                    case "desc":
                        return _this.map.sort(function (a, b) {
                            return b[direction] - a[direction];
                        });
                    case "asc":
                        return _this.map.sort(function (a, b) {
                            return a[direction] - b[direction];
                        });
                }
            };
            this.getHead = function () {
                var map = _this.getAll({ order: "asc" });
                if (map.length < 1) {
                    return null;
                }
                return map[0];
            };
            this.getTail = function () {
                var map = _this.getAll({ order: "desc" });
                if (map.length < 1) {
                    return null;
                }
                return map[0];
            };
            this.getHeadAndTail = function () {
                var map = _this.getAll({ order: "asc" });
                if (map.length < 1) {
                    return null;
                }
                return {
                    head: map[0],
                    tail: map[map.length - 1]
                };
            };
        }
        Object.defineProperty(RenderedNodes.prototype, "nodes", {
            /** @internal */
            get: function () {
                return this.containerNavtiveElement.childNodes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderedNodes.prototype, "map", {
            get: function () {
                var map = [];
                var nodes = this.nodes;
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    map.push({
                        left: this.getX(node) + node.offsetLeft,
                        node: node,
                        scope: angular.element(node).scope()
                    });
                }
                return map;
            },
            enumerable: true,
            configurable: true
        });
        return RenderedNodes;
    })();
    ngX.RenderedNodes = RenderedNodes;
    angular.module("ngX").service("renderedNodes", ["getX", RenderedNodes]);
})(ngX || (ngX = {}));

//# sourceMappingURL=renderedNodes.js.map

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
    try {
        angular.module("ngRoute");
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
                        arguments[1].reloadOnSearch = arguments[1].reloadOnSearch || false;
                        if (arguments[1].componentName && !arguments[1].templateUrl)
                            arguments[1].templateUrl = ngX.getTemplateUrlFromComponentName({
                                moduleName: arguments[1].moduleName,
                                componentName: arguments[1].componentName
                            });
                        arguments[1].resolve = arguments[1].resolve || {};
                        angular.extend(arguments[1].resolve, {
                            routeData: [
                                "routeResolverService", function (routeResolverService) {
                                    return routeResolverService.resolve(path);
                                }
                            ]
                        });
                    }
                    whenFn.apply($routeProvider, arguments);
                    return $routeProvider;
                };
            }])
            .run(["$injector", "$location", "$rootScope", "fire", function ($injector, $location, $rootScope, fire) {
                $rootScope.$on("$viewContentLoaded", function () {
                    var $route = $injector.get("$route");
                    var instance = $route.current.scope[$route.current.controllerAs];
                    if (instance.onInit)
                        instance.onInit();
                    instance.onChildUpdated = function (event) {
                        fire(document, "vmUpdate", {
                            model: event.model,
                            action: event.action
                        });
                    };
                    document.addEventListener("modelUpdate", instance.onChildUpdated);
                    $route.current.scope.$on("$destroy", function () {
                        document.removeEventListener("modelUpdate", instance.onChildrenUpdated);
                    });
                });
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    var instance = current && current.controllerAs && current.scope ? current.scope[current.controllerAs] : null;
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
    }
    catch (error) {
    }
})(ngX || (ngX = {}));

//# sourceMappingURL=routeResolverServiceProvider.js.map

var ngX;
(function (ngX) {
    ngX.translateX = function (element, value) {
        angular.element(element).css({
            "-moz-transform": "translateX(" + value + "px)",
            "-webkit-transform": "translateX(" + value + "px)",
            "-ms-transform": "translateX(" + value + "px)",
            "-transform": "translateX(" + value + "px)"
        });
        return element;
    };
    angular.module("ngX").value("translateX", ngX.translateX);
})(ngX || (ngX = {}));

//# sourceMappingURL=translateX.js.map

var ngX;
(function (ngX) {
    "use strict";
    var $q = angular.injector(['ng']).get("$q");
    ngX.translateXAsync = function (options) {
        var deferred = $q.defer();
        angular.element(options.element).css({
            "-moz-transform": "translateX(" + options.x + "px)",
            "-webkit-transform": "translateX(" + options.x + "px)",
            "-ms-transform": "translateX(" + options.x + "px)",
            "-transform": "translateX(" + options.x + "px)"
        });
        options.element.addEventListener('transitionend', resolve, false);
        function resolve() {
            options.element.removeEventListener('transitionend', resolve);
            deferred.resolve();
        }
        return deferred.promise;
    };
    angular.module("ngX").value("translateXAsync", ngX.translateXAsync);
})(ngX || (ngX = {}));

//# sourceMappingURL=translateXAsync.js.map
