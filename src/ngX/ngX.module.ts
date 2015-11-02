try {
    angular.module("ngRoute");

    angular.module("ngX", ["ngRoute"]); 
    } catch (error) {
    angular.module("ngX", []); 
}
