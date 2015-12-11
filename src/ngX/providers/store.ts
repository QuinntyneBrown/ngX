module ngX {

    function store(dispatcher) {

        var self = this;
        self.dispatcher = dispatcher;

        self.createInstance = function () { return new this(self.dispatcher); }

        self.getById = function (id) {
            var item = null;
            for (var i = 0; i < self.items.length; i++) {
                if (self.items[i].id === id) {
                    item = self.items[i];
                }
            }
            return item;
        }

        self.addOrUpdate = function (options) {
            var exists = false;
            for (var i = 0; i < self.items.length; i++) {
                if (self.items[i].id === options.data.id) {
                    exists = true;
                    self.items[i] = options.data;
                }
            }
            if (!exists)
                self.items.push(options.data);
        }

        self.items = [];

        self.emitChange = function (options) {
            self.dispatcher.emit({
                actionType: "CHANGE", options: {
                    id: options ? options.id : null,
                    data: options ? options.data : null
                }
            });
        }

        return self;
    }

    angular.module("ngX").service("store", ["dispatcher", store]);

}