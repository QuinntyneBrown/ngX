module ngX {

    "use strict";

    /**
    * @name fetchCounter
    * @module ngX
    */
    export class fetchCounter {

        constructor() { }
        
    }

    angular.module("ngX").service("fetchCounter", ["$q", fetchCounter])
        .run(["fetchCounter", (fetchCounter) => { }]);
} 