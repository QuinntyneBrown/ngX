module ngX {

    "use strict";

    angular.module("ngX").value("fire", (target: HTMLElement, type: string, properties: any) => {
        var htmlEvent = document.createEvent("HTMLEvents");

        htmlEvent.initEvent(type, true, true);

        for (var j in properties) {
            htmlEvent[j] = properties[j];
        }

        target.dispatchEvent(htmlEvent);
    });

} 