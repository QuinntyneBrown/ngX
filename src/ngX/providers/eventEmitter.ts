module ngX {

    //http://victorsavkin.com/post/99998937651/building-angular-apps-using-flux-architecture    
    class EventEmitter {

        constructor() {
            this.listeners = [];
        }

        emit(event) {
            this.listeners.forEach((listener) => {
                listener(event);
            });
        }

        addListener(listener) {
            this.listeners.push(listener);
            return this.listeners.length - 1;
        }

        listeners:Array<any> = [];
    }

    angular.module("ngX").service("eventEmitter", [EventEmitter]);
}