
/**
 * es2015寫法
** */
// var HelloWorld = React.createClass({
//     getInitialState: function(){
//         return {
//             text: "Hello React World!!!"
//         }
//     },

//     render: function(){
//         return(<h2>{this.state.text}</h2>)
//     }
// });

/**
 * es6寫法
 */

class HelloWorld extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: "Hello React World!!!"
        };
    }

    render() {
        return(<h2>
            {this.state.text}
        </h2>);
    }
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));