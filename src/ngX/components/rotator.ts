module ngX.Components {

    "use strict";

    /**
     * @name Rotator
     * @description
     */
    class Rotator {
        constructor($attrs: ng.IAttributes,
            $compile: ng.ICompileService,
            $element: ng.IAugmentedJQuery,
            $http: ng.IHttpService,
            $interval: ng.IIntervalService,
            $q: ng.IQService,
            $scope: ng.IScope,
            $timeout: ng.ITimeoutService,
            $transclude: Function,
            getHtml: Function,
            getX: Function,
            translateX: Function,
            translateXAsync: Function
            ) { }

    }

    angular.module("ngX.components").controller("rotatorController", [
        "$attrs",
        "$compile",
        "$element",
        "$http",
        "$interval",
        "$q",
        "$scope",
        "$timeout",
        "$transclude",
        "getHtml",
        "getX",
        "translateX",
        "translateXAsync",
        Rotator
    ]);

    var styles = [
        " .rotator .slide { ",
        "   transition: transform 0.5s cubic-bezier(0.1, 0.1, 0.25, 0.9); } ",

        " .rotator .notransistion.slide { ",
        "  transition: none !important; } ",

        " .rotator .view-port { ",
        "   position: relative; ",
        "   overflow-x: hidden; ",
        "   overflow-y: hidden; ",
        "   width: 750px; ",
        " } ",

        " .rotator .view-port .previous-arrow img, ",
        " .rotator .view-port .next-arrow img { ",
        "   position: absolute; ",
        "   top: calc(50% - 40px); ",
        "   cursor: pointer; ",
        "   left: 0; ",
        "   z-index: 999; ",
        "   opacity: .4; ",
        "   transition: opacity .500s; } ",

        " .rotator .view-port .next-arrow img { ",
        "   left: calc(100% - 80px); } ",

        " .rotator .view-port .container { ",
        "   width: 99999px; } ",

        " .rotator .view-port .previous-arrow img:hover, ",
        " .rotator .view-port .next-arrow img:hover { ",
        "   opacity: .7; } ",

        " .rotator .view-port .slide { ",
        "   position: relative; ",
        "   float: left; ",
        "   margin: 0 auto; } "

    ].join("\n");

    angular.module("ngX.components").directive("rotator", [
        () => {
            return {
                restrict: "E",
                replace: true,
                transclude: "element",
                controller: "rotatorContrller",
                controllerAs:"vm",
                scope: {
                    previousButtonImageUrl: "@",
                    nextButtonImageUrl:"@"
                },
                compile: () => {
                    pre:() => {
                        if (!ngX.componentStyles["rotator"]) {
                            componentStyles["rotator"] = true;
                            document.addEventListener("DOMContentLoaded", onDocumentLoad);
                            function onDocumentLoad() {
                                var head = document.getElementsByTagName("head");
                                var augmentedJQuery = angular.element("<style>" + styles + "</style>");
                                head[0].appendChild(augmentedJQuery[0]);
                                document.removeEventListener("DOMContentLoaded", onDocumentLoad);
                            }
                        }                     
                    }
                },
                template: [
                    "<div rotator class='rotator'>",
                    "<div class='view-port'>",
                    "<div class='previous-arrow' data-ng-click='vm.onPrevious()'><img data-ng-src='{{ ::previousButtonImageUrl }}'/></div>",
                    "<div class='next-arrow' data-ng-click='vm.onNext()'><img data-ng-src='{{ ::nextButtonImageUrl }}'/></div>",
                    "<div class='container'>",
                    "</div>",
                    "</div>",
                    "</div>"
                ].join(" ")
            }
        }
    ]);


}