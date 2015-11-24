 declare module ngX {
 
     export interface IGetFormFactor {
         (): formFactor;
     }

     export interface IGetX {
         (element: HTMLElement): number;
     }

    /**
     * @name ITranslateXAsync
     * @module ngX
     */
     export interface ITranslateXAsync {
         (options: any): ng.IPromise<any>;
     }

     /**
* @name IRouteResolverServiceProvider
* @module App.Common
*/
     export interface IRouteResolverServiceProvider extends ng.IServiceProvider {

         configure(routePromise: IRoutePromise);

         /**
     * get route promises ordered by priority (ASC)
     * priority 1 runs before priority 10
     */
         routePromises: Array<IRoutePromise>;

         /**
         * Reduce RoutePromises into prioritized groups
         * Put the route promises with the same priority in the same group
         * Eventually will be resolve together asynchronously with $q.all
         */
         reduceRoutePromisesByPriority(routePromises: IRoutePromise[]): Array<IRoutePromisesPrioritizedGroup>;
     }

     /**
     * @name IRouteResolverService
     * @module App.Common
     */
     export interface IRouteResolverService {
         resolve(routeName: string): ng.IPromise<any>;
     }

     /**
     * @name IRoutePromise
     * @module App.Common
     */
     export interface IRoutePromise {
         priority?: number;
         route?: string;
         promise: any;
         key?: string;
         routes?: Array<string>;
     }

     /**
     * @name IRoutePromiseInstanceOptions
     * @module App.Common
     */
     export interface IRoutePromiseInstanceOptions {

     }

     /**
     * @name IRoutePromisesPrioritizedGroup
     * @module App.Common
     */
     export interface IRoutePromisesPrioritizedGroup {
         promises: IRoutePromise[];
         priority: number;
         isLast: boolean;
     }

    
 }