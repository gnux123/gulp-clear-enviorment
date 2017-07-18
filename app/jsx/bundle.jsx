var HelloWorld = React.createClass({
    getInitialState: function(){
        return {
            text: "Hello React World!!!"
        }
    },

    render: function(){
        return(<h2>{this.state.text}</h2>)
    }
});

ReactDOM.render(<HelloWorld />, document.getElementById('root'));