module ngX {
    function safeDigest(scope) {
        if (!scope.$$phase && (scope.$root && !scope.$root.$$phase))
            scope.$digest();
    }

    angular.module("ngX").value("safeDigest", safeDigest);
    
}