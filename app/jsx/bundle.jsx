const { observable, computed, action, useStrict, autorun } = mobx;
const { observer } = mobxReact;

useStrict(true);

/**
 * mobx test
 */
class Store {
    @observable parkData = [];


    constructor() {
        autorun(() => {
            // console.log(this.parkData);
        });
    }


    @action changeData(){

        /**
         * 結束觸發的callback function, 被@action給包住了,
         * 因為@action無法影響當前function調用的ajax，而這個callback毫無疑問是一個ajax，
         * 所以必須再用一個action來包住它，這樣程序才不會報錯
         * http://www.jianshu.com/p/505d9d9fe36a
         */

        $.getJSON('https://gist.githubusercontent.com/gnux123/24c17078ae6b1ccf6719c7b1c55ab039/raw/6f6ed57784a5eaae955ec38696861e1bbc6615e6/kh.json')
         .then(action("Get Kaohsiung Park Json Data.", function (result) {
            //do something
            this.parkData = result;
         }.bind(this)));
    }

    //計算parkData
    @computed get parkDataRows(){
        console.log(this.parkData);
        var _parkNameArr = [];
        for(let i = 0; i < this.parkData.length; i++){
            _parkNameArr.push(this.parkData[i].Name);
        }

        return _parkNameArr;
    }

}

@observer
class TodoBox extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillReact() {
        /**
         * oberservable Array 有變動時會呼叫這個function
         */
        console.log("I will re-render, since has changed!");
        console.log(this.props.store.parkDataRows.length);
    }

    getData(e){
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
                        (this.props.store.parkDataRows.length != 0)
                        ?this.props.store.parkDataRows.map(function(item, index){
                            return <li key={index}>{item}</li>
                        }, this)
                        :null
                    }
                </ul>

            </div>
        )
    }
}

const store = new Store();

ReactDOM.render(<TodoBox store={store} />, document.getElementById('es6root'));