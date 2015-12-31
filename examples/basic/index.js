angular.module("basicApp", ["ngX"])
    .config([
    "$routeProvider", function ($routeProvider) {
        ngX.Configure({
            templateMappingFn: function (options) {
                var location = "/examples/basic/" + options.componentName.replace(/\W+/g, '.')
                    .replace(/([a-z\d])([A-Z])/g, '$1.$2') + ".html";
                return location.toLowerCase();
            }
        });
        $routeProvider.when("/", {
            componentName: "homeComponent"
        });
    }]);
var HomeComponent = (function () {
    function HomeComponent() {
    }
    Object.defineProperty(HomeComponent.prototype, "greeting", {
        get: function () { return "ngX"; },
        enumerable: true,
        configurable: true
    });
    return HomeComponent;
})();
ngX.Component({
    module: "basicApp",
    component: HomeComponent,
    componentName: "homeComponent"
});
var AnotherComponent = (function () {
    function AnotherComponent($element, $scope) {
        var _this = this;
        this.$element = $element;
        this.$scope = $scope;
        this.bootstrap = function () {
            _this.$element[0].addEventListener("click", _this.onClick);
            _this.$scope.$on("$destroy", _this.dispose);
        };
        this.dispose = function () {
            _this.$element[0].removeEventListener("click", _this.onClick);
        };
        this.onClick = function () {
            alert("It just got real!");
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
ngX.Component({
    module: "basicApp",
    component: AnotherComponent,
    selector: "another-component",
    providers: ["$element", "$scope"],
    template: ["<h1>{{::vm.anotherGreeting}}</h1>"].join(" ")
});
