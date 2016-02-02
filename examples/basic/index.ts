angular.module("basicApp", ["ngX"])
    .config([
    "$routeProvider", ($routeProvider: any) => {

    ngX.Configure({
        templateMappingFn: (options:any) => {
            var location = "/examples/basic/" + options.componentName.replace(/\W+/g, '.')
                .replace(/([a-z\d])([A-Z])/g, '$1.$2') + ".html";
            return location.toLowerCase();
        }
    });

    $routeProvider.when("/", {
        componentName: "homeComponent"
    });

}]);

class HomeComponent {    
    public get greeting() { return "ngX"; }

    storeOnChange = () => {

    }
}

ngX.Component({
    module: "basicApp",
    component: HomeComponent,
    componentName: "homeComponent"    
});


class AnotherComponent {
    constructor(private $element: ng.IAugmentedJQuery, private $scope:ng.IScope) {
        this.bootstrap();

    }

    public bootstrap = () => {
        this.$element[0].addEventListener("click", this.onClick);
        this.$scope.$on("$destroy", this.dispose);
    }

    public dispose = () => {
        this.$element[0].removeEventListener("click", this.onClick);
    }

    public onClick = () => {
        alert("It just got real!");
    }

    public get anotherGreeting() { return "ngX Boom!"; }
}

ngX.Component({
    module: "basicApp",
    component: AnotherComponent,
    selector: "another-component",
    providers:["$element","$scope"],
    template: ["<h1>{{::vm.anotherGreeting}}</h1>"].join(" ")
});