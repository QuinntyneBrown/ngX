module ngX {
    
    /**
     * @name DataService
     * @module ngX
     */
    export class DataService {

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

        private inMemoryCache = {};

        public fromServiceOrCache = (options: any) => {
            var deferred = this.$q.defer();
            this.$http({ method: options.method, url: options.url }).then((results) => {
                deferred.resolve(results);
            });
            return deferred.promise;
        }

        public fromService = (options: any) => {
            var deferred = this.$q.defer();
            this.$http({ method: options.method, url: options.url, data: options.data, params: options.params }).then((results) => {
                deferred.resolve(results);
            });
            return deferred.promise;
        }

        public invalidateCache = () => {
            this.inMemoryCache = {};
        }
    }

    angular.module("ngX").service("dataService", ["$http", "$q", DataService]);
} 