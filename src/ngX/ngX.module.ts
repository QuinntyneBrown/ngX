module ngX {
    export var componentStyles = {};
    export var isBootstrapped = false;
}

try {
    angular.module("ngRoute");    
    angular.module("ngX", ["ngRoute"]);
}
catch(error){
    angular.module("ngX", []); 
}

