﻿module ngX {
    export var isBootstrapped = false;
}

function isAngularPresent() {
    return typeof angular === 'object';
}

if (isAngularPresent() === false) {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.js');
    document.head.appendChild(scriptTag);
}

try {
    angular.module("ngRoute");

    angular.module("ngX", ["ngRoute"]); 
    } catch (error) {
    angular.module("ngX", []); 
}
