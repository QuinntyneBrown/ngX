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
    }

    angular.module("ngX").service("navigation", ["$location", "$rootScope", "localStorageManager", navigation]);
}