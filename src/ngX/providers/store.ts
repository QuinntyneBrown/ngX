module ngX {

    interface IReducer {
        (state, action): any;
    }

    class Store {

        constructor(dispatcher, private reducers: IReducer[]) {
            this.subject = new Rx.BehaviorSubject();
            dispatcher.subscribe(this.onNext);
        }

        onNext = (action) => {
            for (var i = 0; i < this.reducers.length; i++) {
                this.state = this.reducers[i](this.state, action);
            }
            this.subject.onNext(this.state);
        }

        subscribe = (onNext) => { this.subject.subscribe(onNext); }

        observerable;
        subject;
        state = {};
    }

    angular.module("ngX").service("store", ["dispatcher","reducers", Store]);
}
