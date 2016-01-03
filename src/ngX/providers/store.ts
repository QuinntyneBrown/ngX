module ngX {

    class Store {
        
        constructor(private dispatcher) { }

        items = [];

        createInstance() {  return new Store(this.dispatcher); }

        getById = id => {
            var item = null;
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    item = this.items[i];
                }
            }
            return item;
        }

        addOrUpdate = function (options) {
            var exists = false;
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === options.data.id) {
                    exists = true;
                    this.items[i] = options.data;
                }
            }
            if (!exists)
                this.items.push(options.data);
        }
        
        emitChange = function (options) {
            this.dispatcher.emit({
                actionType: "CHANGE", options: {
                    id: options ? options.id : null,
                    data: options ? options.data : null
                }
            });
        }
        
    }

    angular.module("ngX").service("store", ["dispatcher", Store]);
}

module ngX {

    export var Store = (options) => {
        options.module = options.module || "app";
        options.name = options.name || getFunctionName(options.store);
        options.providers.push(options.store);
        angular.module(options.module)
            .service(options.name, options.providers)
            .run([options.name, "dispatcher", "store", function (store, dispatcher, baseStore) {
                store.emitChange = function (options) {
                    dispatcher.emit({ actionType: "CHANGE", options: { id: options.id } });
                };
                store.storeInstance = baseStore.createInstance();
                Object.defineProperty(store, "items", {
                    "get": function () { return store.storeInstance.items; }
                });

                store.getById = function (id) { return store.storeInstance.getById(id); }

                if (store.connection)
                    store.connection.start({ transport: 'longPolling' }, function () { });

            }]);
    }
}