const { observable, computed, action, useStrict } = mobx;
const { observer } = mobxReact;

mobx.useStrict(true);

/**
 * mobx test
 */
class Store {
    @observable todos = [
        {
        title: "todo标题",
        done: false
        },
        {
        title: "todo标题2",
        done: false
        }
    ];

    @action changeData(index, title) {
        console.log(1);
        this.todos[index].title = title;
    }
}

@observer
class TodoBox extends React.Component {

    constructor(props) {
        super(props);
    }

    getData(e){
        console.log(this.props.store);
        this.props.store.changeData(0,"我要成為海賊王");
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.store.todos.map(todo => <li>{todo.title}</li>)}
                </ul>
                <div>
                    <a onClick={this.getData.bind(this)}>按我拉</a>
                </div>
            </div>
        )
    }
}

const store = new Store();


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
            text: "hello my vincent2"
        });
    },

    render: function(){
        return(<h2>{this.state.text}</h2>)
    }
});

/**
 * es6寫法
 */
const logoGo = (add, text) => {
    let ShowText = add + text;
    return ShowText;
};

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutText: ""
        };
    }

    componentWillMount() {
        this.setState({
            aboutText: (!!this.props.title)?this.props.title:this.state.aboutText
        });
    }

    render() {
        return(
            <div>
                <br/>
                <p>{this.state.aboutText}</p>
                <span>{logoGo("myName:","vincent")}</span>
            </div>
        );
    }
}

export default class HelloWorldES6 extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: "Hello React ES6 World!!!",
            aboutTitle: "vincent.sue Show Time"
        };
    }

    componentWillMount(){
        this.setState({text: "hello my ES61"});
    }

    render() {
        return(<h3 className="es6_title">
            {this.state.text}
            <AboutMe title={this.state.aboutTitle} />
        </h3>);
    }
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));

ReactDOM.render(<TodoBox store={store} />, document.getElementById('es6root'));