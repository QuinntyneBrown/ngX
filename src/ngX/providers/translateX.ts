module ngX {

    export var translateX: any = (element: HTMLElement, value: number): HTMLElement => {
        angular.element(element).css({
            "-moz-transform": "translateX(" + value + "px)",
            "-webkit-transform": "translateX(" + value + "px)",
            "-ms-transform": "translateX(" + value + "px)",
            "-transform": "translateX(" + value + "px)"
        });

        return element;
    }

    angular.module("ngX").value("translateX", translateX);
} 