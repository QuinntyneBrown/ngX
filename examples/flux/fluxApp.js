angular.module("fluxApp", ["ngX"])
    .config([
    "$routeProvider", function ($routeProvider) {
        ngX.Configure({
            templateMappingFn: function (options) {
                var location = "/examples/flux/" + options.componentName.replace(/\W+/g, '.')
                    .replace(/([a-z\d])([A-Z])/g, '$1.$2') + ".html";
                return location.toLowerCase();
            }
        });
        $routeProvider.when("/", { componentName: "homeComponent" });
    }])
    .config(["reducersProvider", function (reducersProvider) {
        reducersProvider.configure(function (state, action) {
            if (state.value) {
                state.value = state.value + action.value;
            }
            else {
                state.value = action.value;
            }
            return state;
        });
    }]);
var fluxApp;
(function (fluxApp) {
    var AddAction = (function () {
        function AddAction(value) {
            this.value = value;
        }
        return AddAction;
    })();
    fluxApp.AddAction = AddAction;
    var ActionCreator = (function () {
        function ActionCreator(dispatcher) {
            var _this = this;
            this.dispatcher = dispatcher;
            this.add = function () { return _this.dispatcher.dispatch(new AddAction(1)); };
        }
        return ActionCreator;
    })();
    fluxApp.ActionCreator = ActionCreator;
    angular.module("fluxApp").service("actionCreator", ["dispatcher", ActionCreator]);
    var HomeComponent = (function () {
        function HomeComponent() {
            var _this = this;
            this.storeOnChange = function (state) { return _this.state = state; };
            this.state = {
                value: 0
            };
        }
        Object.defineProperty(HomeComponent.prototype, "greeting", {
            get: function () { return "ngX"; },
            enumerable: true,
            configurable: true
        });
        return HomeComponent;
    })();
    fluxApp.HomeComponent = HomeComponent;
    var AnotherComponent = (function () {
        function AnotherComponent($element, $scope, actionCreator) {
            var _this = this;
            this.$element = $element;
            this.$scope = $scope;
            this.actionCreator = actionCreator;
            this.storeOnChange = function (state) { return console.log(JSON.stringify(state)); };
            this.bootstrap = function () {
                _this.$element[0].addEventListener("click", _this.onClick);
                _this.$scope.$on("$destroy", _this.dispose);
            };
            this.dispose = function () {
                _this.$element[0].removeEventListener("click", _this.onClick);
            };
            this.onClick = function () {
                _this.actionCreator.add();
            };
            this.bootstrap();
        }
        Object.defineProperty(AnotherComponent.prototype, "anotherGreeting", {
            get: function () { return "ngX Boom!"; },
            enumerable: true,
            configurable: true
        });
        return AnotherComponent;
    })();
    fluxApp.AnotherComponent = AnotherComponent;
})(fluxApp || (fluxApp = {}));
ngX.Component({
    module: "fluxApp",
    component: fluxApp.HomeComponent,
    componentName: "homeComponent"
});
ngX.Component({
    module: "fluxApp",
    component: fluxApp.AnotherComponent,
    selector: "another-component",
    styles: [".a {} "],
    providers: ["$element", "$scope", "actionCreator"],
    template: ["<h1>{{::vm.anotherGreeting}}</h1>"].join(" ")
});
