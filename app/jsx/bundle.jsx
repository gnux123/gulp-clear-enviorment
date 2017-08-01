const { observable, computed, action, useStrict, autorun } = mobx;
const { observer } = mobxReact;

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

    @observable parkData = [];


    constructor() {
        autorun(() => {
            this.changeData();
            // console.log(this.parkData);
        });
    }


    @action changeData(){
        $.getJSON('https://gist.githubusercontent.com/gnux123/24c17078ae6b1ccf6719c7b1c55ab039/raw/6f6ed57784a5eaae955ec38696861e1bbc6615e6/kh.json').then(function(result){
            this.parkData = result;
        }.bind(this));
    }

    //計算parkData
    @computed get parkDataRows(){
        var _parkNameArr = [];
        for (var i = 0; i < this.parkData.length; i++){
            var _parkName = this.parkData[i].Name;
            _parkNameArr.push(_parkName);
        }

        console.log(_parkNameArr);
        return _parkNameArr;
    }

}

@observer
class TodoBox extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillReact() {
        console.log("I will re-render, since the todo has changed!");
    }

    getData(){
        // alert(1);
        this.props.store.changeData();
    }

    render() {
        console.log(this.props.store.parkDataRows);
        return (
            <div>
                <div>
                    <a onClick={this.getData.bind(this)}>按我拉</a>
                </div>
                <ul>
                    {
                        this.props.store.parkDataRows.map(function(item, index){
                            return <li key={index}>{item}</li>
                        }, this)
                    }
                </ul>

            </div>
        )
    }
}

const store = new Store();

ReactDOM.render(<TodoBox store={store} />, document.getElementById('es6root'));