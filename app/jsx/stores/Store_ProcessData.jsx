var Dispatcher = require('../dispatcher');
var Constants = require('../constants/constant');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var APIMethods = Constants.METHODS;
var CHANGE_EVENT = 'APIChange';
var _ParkData = {};

var Store = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getParkData: function() {
        return _ParkData;
    }

});


Store.dispatchToken = Dispatcher.register(function(action){
    switch(action.type) {
        case APIMethods.GETAPIDATA:
            _ParkData = action.data;
            Store.emitChange();
            break;
        default:
    }
});

module.exports = Store;