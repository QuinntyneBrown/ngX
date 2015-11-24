module ngX {

    //http://victorsavkin.com/post/99998937651/building-angular-apps-using-flux-architecture    

    function eventEmitter(guid) {

        var self = this;

        self.listeners = [];

        self.addListener = function (options) {
            var id = guid();
            self.listeners.push({
                id: id,
                actionType: options.actionType,
                callback: options.callback
            });
            return id;
        };

        self.removeListener = function (options) {
            for (var i = 0; i < self.listeners.length; i++) {
                if (self.listeners[i].id === options.id) {
                    self.listeners.slice(i, 1);
                }
            }
        }

        self.emit = function (options) {
            for (var i = 0; i < self.listeners.length; i++) {
                if (self.listeners[i].actionType === options.actionType) {
                    self.listeners[i].callback(options.options);
                }
            }
        }

        return self;
    }

    angular.module("ngX").service("dispatcher", ["guid", eventEmitter]);
    
}