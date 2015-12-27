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