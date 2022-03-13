class ViewSwitcher extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tabs:props.tabs,
            onSwitch:props.onSwitch
        }
    }
 
    renderTab(tab,key){
        return <li id={`v_${tab}`} onClick={(e)=>this.state.onSwitch(e)} key={key}>
            <h1>
                {tab}
            </h1>
        </li>
    }

    render(){
        return <React.Fragment>
            <ul className="switcher-tabs">
                {this.state.tabs.map(
                    (x,y)=>this.renderTab(x,y)
                )}
            </ul>
        </React.Fragment>
    }
}