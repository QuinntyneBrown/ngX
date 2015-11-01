angular.module("basicApp", ["ngX"])
    .config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            componentName: "homeComponent",
            componentTemplateUrl: "/examples/basic/home.component.html"
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
    function AnotherComponent($element) {
        var _this = this;
        this.$element = $element;
        this.bootstrap = function () {
            _this.$element[0].addEventListener("click", function () {
                alert("It just got real!");
            });
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
    providers: ["$element"],
    template: ["<h1>{{::vm.anotherGreeting}}</h1>"].join(" ")
});
//# sourceMappingURL=index.js.map