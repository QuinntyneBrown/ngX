angular.module("basicApp", ["ngX"]).config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider.when("/", {
            componentName: "homeComponent",
            componentTemplateUrl: "/examples/basic/home.component.html"
        });
    }
]);
var HomeComponent = (function () {
    function HomeComponent() {
    }
    Object.defineProperty(HomeComponent.prototype, "greeting", {
        get: function () {
            return "ngX";
        },
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
//# sourceMappingURL=index.js.map