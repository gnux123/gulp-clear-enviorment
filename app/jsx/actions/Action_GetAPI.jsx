var Dispatcher = require('../dispatcher');
var Constants = require('../constants/constant');

var APIMethods = Constants.METHODS;
var ApiDataAddress = 'https://gist.githubusercontent.com/gnux123/24c17078ae6b1ccf6719c7b1c55ab039/raw/6f6ed57784a5eaae955ec38696861e1bbc6615e6/kh.json';

module.exports = {
    GetParkData: function(){
        $.getJSON(ApiDataAddress).then(function(results){
            Dispatcher.dispatch({
                type: APIMethods.GETAPIDATA,
                data: results
            });
        });
    }
};