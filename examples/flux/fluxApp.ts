angular.module("fluxApp", ["ngX"])
    .config([
        "$routeProvider", ($routeProvider: any) => {

            ngX.Configure({
                templateMappingFn: (options: any) => {
                    var location = "/examples/flux/" + options.componentName.replace(/\W+/g, '.')
                        .replace(/([a-z\d])([A-Z])/g, '$1.$2') + ".html";
                    return location.toLowerCase();
                }
            });

            $routeProvider.when("/", { componentName: "homeComponent" });

        }])
    .config(["reducersProvider", reducersProvider=> {
        reducersProvider.configure((state, action) => {
            if (state.value) {
                state.value = state.value + action.value;
            } else {
                state.value = action.value;
            }
            return state;
        });
    }]);

module fluxApp {

    export class AddAction { constructor(public value) { } }

    export class ActionCreator {
        constructor(private dispatcher) { }

        add = () => this.dispatcher.dispatch(new AddAction(1));
    }

    angular.module("fluxApp").service("actionCreator", ["dispatcher", ActionCreator]);




    export class HomeComponent {
        
        public get greeting() { return "ngX"; }

        storeOnChange = state => this.state = state;
  
        state: any = {
            value:0
        };
    }

    export class AnotherComponent {
        constructor(private $element: ng.IAugmentedJQuery, private $scope: ng.IScope, private actionCreator) {
            this.bootstrap();

        }

        storeOnChange = state => console.log(JSON.stringify(state));

        public bootstrap = () => {
            this.$element[0].addEventListener("click", this.onClick);
            this.$scope.$on("$destroy", this.dispose);
        }

        public dispose = () => {
            this.$element[0].removeEventListener("click", this.onClick);
        }

        public onClick = () => {
            this.actionCreator.add();
        }

        public get anotherGreeting() { return "ngX Boom!"; }
    }
}


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
    providers: ["$element", "$scope","actionCreator"],
    template: ["<h1>{{::vm.anotherGreeting}}</h1>"].join(" ")
});