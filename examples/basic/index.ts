angular.module("basicApp", ["ngRoute", "ngX"])
    .config([
    "$routeProvider", ($routeProvider:any) => {
    $routeProvider.when("/", {
        componentName: "homeComponent",
        componentTemplateUrl: "/examples/basic/home.component.html"
    });
    }]);


class HomeComponent {
    
}

ngX.Component({
    module: "basicApp",
    component: HomeComponent,
    componentName: "homeComponent"
    
});