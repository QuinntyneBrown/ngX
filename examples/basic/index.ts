angular.module("basicApp", ["ngX"])
    .config([
    "$routeProvider", ($routeProvider:any) => {
    $routeProvider.when("/", {
        componentName: "homeComponent",
        componentTemplateUrl: "/examples/basic/home.component.html"
    });
}]);

class HomeComponent {    
    public get greeting() { return "ngX"; }
}

ngX.Component({
    module: "basicApp",
    component: HomeComponent,
    componentName: "homeComponent"    
});