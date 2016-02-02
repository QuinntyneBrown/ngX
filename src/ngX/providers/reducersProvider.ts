module ngX {
    
    export class ReducersProvider implements angular.IServiceProvider {
        configure = reducer => this.reducers.push(reducer)
        reducers = [];
        $get = () => this.reducers;
    }
    angular.module("ngX").provider("reducers", ReducersProvider);
}