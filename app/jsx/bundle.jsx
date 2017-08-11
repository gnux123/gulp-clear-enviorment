var Action = require('./actions/Action_GetAPI');
var Store = require('./stores/Store_ProcessData');

/**
 * es2015寫法
** */
var HelloWorld = React.createClass({
    getInitialState: function(){
        return {
            data: []
        }
    },

    componentWillMount: function(){
        Action.GetParkData();
        Store.addChangeListener(this._onParkDataChange);
    },

    render: function(){
        return(
            <ul>
                {
                    this.state.data.map(function(item){
                        return <li>{item.Name}</li>
                    }, this)
                }

            </ul>
        );
    },

    _onParkDataChange: function(){
        this.setState({ data: Store.getParkData() });
    }
});

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
