module ngX {

    class SecurityStore {

        constructor(private $rootScope, private localStorageManager: any) {
            document.addEventListener("FETCH_SUCCESS", (event:any) => {
                if (event.results && event.results.data.access_token) {
                    this.token = event.results.data.access_token;
                    $rootScope.$broadcast("STORE_UPDATE", { store: this });
                }
            });           
        }

        
        public get token() {
            return this.localStorageManager.get({ name: "token" });
        }

        public set token(value: any) {
            this.localStorageManager.put({ name: "token", value: value });
        }

        public get currentUser() {
            return this.localStorageManager.get({ name: "currentUser" });
        }

        public set currentUser(value: any) {
            this.localStorageManager.put({ name: "currentUser", value: value });
        }
    }

    angular.module("ngX").service("securityStore", ["$rootScope","localStorageManager", SecurityStore])
        .run(["securityStore", (securityStore) => {

        }]);


}