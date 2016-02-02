module ngX {

    class Dispatcher {
        constructor(guid) {
            this.subject = new Rx.Subject();
        }

        dispatch = (action) => {
            this.subject.onNext(action);
        }

        subscribe = (onNext) => {
            this.subject.subscribe(onNext);
        }

        subject;
    }
    
    angular.module("ngX").service("dispatcher", ["guid", Dispatcher]);
}