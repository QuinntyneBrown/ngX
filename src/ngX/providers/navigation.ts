module ngX {

    export class navigation {

        constructor(private $location: ng.ILocationService,
            private $rootScope: ng.IRootScopeService,
            private localStorageManager: any) {

            $rootScope.$on("$locationChangeSuccess", () => {
                this.urls.push($location.path());
            });
        }

        public urls = [];

        public goBack = () => {            
            this.$location.path(this.urls.pop());
        }

        public hasHistory = () => {
            return this.urls.length > 0;
        }

        public setTitle = (options:any) => {
            document.title = options.title;
        }

        public setMetaTag = (options: any) => {
            angular.element("meta[name=" + options.name +"]").remove();
            angular.element('head').append("<meta name='" + options.name + "' content='" + options.value +"'>");
        }
    }

    angular.module("ngX")
        .service("navigation", ["$location", "$rootScope", "localStorageManager", navigation])
        .run(["navigation", (navigation) => { }]);

}