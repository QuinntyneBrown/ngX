angular.module("basicApp", ["ngRoute", "ngX"])
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
    HomeComponent.canActivate = function () {
        return [
            "$q", function ($q) {
                return $q.when(true);
            }];
    };
    return HomeComponent;
})();
ngX.Component({
    module: "basicApp",
    component: HomeComponent,
    componentName: "homeComponent"
});
//# sourceMappingURL=index.js.map