﻿module ngX {

    "use strict";

    var formEncode = (data) => {
        var pairs = [];
        for (var name in data) {
            pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return pairs.join('&').replace(/%20/g, '+');
    };  

    angular.module("ngX").value("formEncode", formEncode);

}