﻿module ngX {

    export var getX: IGetX = (element: HTMLElement): number => {
        var transform = angular.element(element).css("transform");
        if (transform === "none") return 0;

        var result = JSON.parse(transform.replace(/^\w+\(/, "[").replace(/\)$/, "]"));

        return JSON.parse(transform.replace(/^\w+\(/, "[").replace(/\)$/, "]"))[4];
    }
    angular.module("ngX").value("getX", getX);

}