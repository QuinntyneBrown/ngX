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


class AnotherComponent {
    constructor(private $element: ng.IAugmentedJQuery) {
        this.bootstrap();
    }

    public bootstrap = () => {
        this.$element[0].addEventListener("click", () => {
            alert("It just got real!");
        });
    }
    public get anotherGreeting() { return "ngX Boom!"; }
}

ngX.Component({
    module: "basicApp",
    component: AnotherComponent,
    selector: "another-component",
    providers:["$element"],
    template: ["<h1>{{::vm.anotherGreeting}}</h1>"].join(" ")
});