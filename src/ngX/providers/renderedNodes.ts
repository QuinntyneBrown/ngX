﻿
module ngX {

    "use strict";


    export interface IRenderedNodes {
        createInstance(options: IRenderedNodesInstanceOptions): IRenderedNodes;
        getAll(options: any);
    }

    export interface IRenderedNodesInstanceOptions {
        containerNavtiveElement: HTMLElement;
    }

    /**
    * @name RenderedNodes
    * @module ngX
    * @description
    */
    export class RenderedNodes implements IRenderedNodes {
        constructor(private getX: IGetX) { }

        public createInstance = (options: IRenderedNodesInstanceOptions) => {
            var instance = new RenderedNodes(this.getX);
            instance.containerNavtiveElement = options.containerNavtiveElement;
            return instance;
        }

        /** @internal */
        private get nodes() {
            return this.containerNavtiveElement.childNodes;
        }

        public get map() {
            var map: Array<any> = [];
            var nodes = this.nodes;
            for (var i = 0; i < nodes.length; i++) {
                var node = <HTMLElement>nodes[i];
                map.push({
                    left: this.getX(node) + node.offsetLeft,
                    node: node,
                    scope: angular.element(node).scope()
                });
            }
            return map;
        }

        public getAll = (options: any): any => {
            var direction: any;
            switch (options.orientation) {
                case "horizontal":
                    direction = "left";
                    break;

                default:
                    direction = "top";
                    break;
            }

            switch (options.order) {
                case "desc":
                    return this.map.sort((a: any, b: any) => {
                        return b[direction] - a[direction];
                    });

                case "asc":
                    return this.map.sort((a: any, b: any) => {
                        return a[direction] - b[direction];
                    });
            }
        }

        public getHead = () => {
            var map = this.getAll({ order: "asc" });
            if (map.length < 1) { return null; }
            return map[0];
        }

        public getTail = () => {
            var map = this.getAll({ order: "desc" });
            if (map.length < 1) { return null; }
            return map[0];
        }

        public getHeadAndTail = () => {
            var map = this.getAll({ order: "asc" });
            if (map.length < 1) { return null; }
            return {
                head: map[0],
                tail: map[map.length - 1]
            };
        }

        private containerNavtiveElement: HTMLElement;

    }

    angular.module("ngX").service("renderedNodes", ["getX", RenderedNodes]);
} 