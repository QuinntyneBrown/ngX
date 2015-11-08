module ngX {

    "use strict";

    /**
    * @name RequestCounter
    * @module ngX
    */
    export class RequestCounter {

        constructor(private $q: ng.IQService) { }

        public static createInstance = ($q) => { return new RequestCounter($q); }

        private requests: number = 0;

        public request = (config) => {
            this.requests += 1;
            return this.$q.when(config);
        }

        public requestError = (error) => {
            this.requests -= 1;
            return this.$q.reject(error);
        }

        public response = (response) => {
            this.requests -= 1;
            return this.$q.when(response);
        }

        public responseError = (error) => {
            this.requests -= 1;
            return this.$q.reject(error);
        }

        public getRequestCount = () => {
            return this.requests;
        }
    }

    angular.module("ngX").factory("requestCounter", ["$q", RequestCounter.createInstance])
        .config([
            "$httpProvider", ($httpProvider) => {
                $httpProvider.interceptors.push("requestCounter");
            }
        ]);
} 