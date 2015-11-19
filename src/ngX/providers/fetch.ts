module ngX {
    
    /**
     * @name fetch
     * @module ngX
     */
    class fetch {

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private fire:Function) { }
        
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

        public get bodyNativeElement() {
            return document.getElementsByTagName("body")[0];
        }

    }

    angular.module("ngX").service("fetch", ["$http", "$q","fire", fetch]);
} 