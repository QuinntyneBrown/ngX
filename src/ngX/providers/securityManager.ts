module ngX {

    class SecurityManager {

        constructor(private localStorageManager: any) {

        }

        
        public get token() {
            return this.localStorageManager.get({ name: "token" });
        }

        public set token(value: any) {
            this.localStorageManager.set({ name: "token", value: value });
        }

        public get currentUser() {
            return this.localStorageManager.get({ name: "currentUser" });
        }

        public set currentUser(value: any) {
            this.localStorageManager.set({ name: "currentUser", value: value });
        }
    }

    angular.module("ngX").service("securityManager", ["localStorageManager",SecurityManager]);

}