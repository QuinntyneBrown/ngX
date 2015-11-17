module ngX {

    class SecurityStore {

        constructor(private localStorageManager: any) {

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

    angular.module("ngX").service("securityStore", ["localStorageManager", SecurityStore]);

}