
/**
 * es2015寫法
** */
var HelloWorld = React.createClass({
    getInitialState: function(){
        return {
            text: "Hello React World!!!1"
        }
    },

    componentWillMount: function(){
        this.setState({
            text: "hello my vincent"
        });
    },

    render: function(){
        return(<h2>{this.state.text}</h2>)
    }
});

/**
 * es6寫法
 */

export default class HelloWorldES6 extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: "Hello React ES6 World!!!"
        };
    }

    componentWillMount(){
        this.setState({text: "hello my ES6"});
    }

    render() {
        return(<h3>
            {this.state.text}
        </h3>);
    }
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));

ReactDOM.render(<HelloWorldES6 />, document.getElementById('es6root'));