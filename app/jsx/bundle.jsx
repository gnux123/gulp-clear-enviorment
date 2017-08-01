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
            // this.changeData();
            // console.log(this.parkData);
        });
    }


    @action changeData(key){

        /**
         * 結束觸發的callback function, 被@action給包住了,
         * 因為@action無法影響當前function調用的ajax，而這個callback毫無疑問是一個ajax，
         * 所以必須再用一個action來包住它，這樣程序才不會報錯
         * http://www.jianshu.com/p/505d9d9fe36a
         */

        $.getJSON('https://gist.githubusercontent.com/gnux123/24c17078ae6b1ccf6719c7b1c55ab039/raw/6f6ed57784a5eaae955ec38696861e1bbc6615e6/kh.json')
         .then(action("Get Kaohsiung Park Json Data.", function (result) {
            //do something
            for(let i=0; i<result.length; i++){
                if(i = key){
                    this.parkData = result;
                }
            }

         }.bind(this)));
    }

    //計算parkData
    @computed get parkDataRows(){
        var _parkNameArr = [];
        for (var i = 0; i < this.parkData.length; i++){
            var _parkName = this.parkData[i].Name;
            _parkNameArr.push(_parkName);
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
        console.log("I will re-render, since the todo has changed!");
        console.log(this.props.store.parkDataRows.length);
    }

    getData(e){
        const _key = e.target.dataset.choice;
        alert(_key);
        this.props.store.changeData(_key);
    }

    render() {
        console.log(this.props.store.parkDataRows);
        return (
            <div>
                <div>
                    <a data-choice="20" onClick={this.getData.bind(this)}>按我拉</a>
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