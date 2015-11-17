module ngX {

    "use strict";

    class AuthorizationInterceptor {

        constructor(private securityStore:any) {

        }

        public static instance = (securityStore: any) => {
            return new AuthorizationInterceptor(securityStore);
        }

        public request = (config) => {
            if (this.securityStore.token) {
                config.headers.Authorization = "Bearer " + this.securityStore.token;
            }

            return config;
        }
    }

    angular.module("ngX")
        .factory("authorizationInterceptor", ["securityStore", AuthorizationInterceptor.instance])
        .config([
            "$httpProvider", ($httpProvider) => {
                $httpProvider.interceptors.push("authorizationInterceptor");
            }
        ]);

}