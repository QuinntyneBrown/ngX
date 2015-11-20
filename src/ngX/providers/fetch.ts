module ngX {
    
    /**
     * @name fetch
     * @module ngX
     */
    class fetch {

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private fire: Function, private localStorageManager) { }
        
        public inMemoryCache: any = {};

        public fromService = (options: any) => {
            this.fire(this.bodyNativeElement, "FETCH_REQUEST", { options: options });
            var deferred = this.$q.defer();
            this.$http({ method: options.method, url: options.url, data: options.data, params: options.params, headers: options.headers }).then((results) => {
                this.fire(this.bodyNativeElement, "FETCH_SUCCESS", { options: options, results: results });
                deferred.resolve(results);
            }).catch((error) => {
                this.fire(this.bodyNativeElement, "FETCH_ERROR", { options: options, error: error });
            });
            return deferred.promise;
        }

        public fromCacheOrService = (options: any) => {
            var deferred = this.$q.defer();
            var cachedData = this.localStorageManager.get({ name: options.url });
            if (!cachedData) {
                this.fromService(options).then((results) => {
                    deferred.resolve(results);
                }).catch((error: Error) => {
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(cachedData.value);
            }
            return deferred.promise;
        }


        public get bodyNativeElement() {
            return document.getElementsByTagName("body")[0];
        }

    }

    angular.module("ngX").service("fetch", ["$http", "$q","fire","localStorageManager", fetch]);
} 