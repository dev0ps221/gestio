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
            {tab}
        </li>
    }

    render(){
        return <React.Fragment>
            <ul>
                {this.state.tabs.map(
                    (x,y)=>this.renderTab(x,y)
                )}
            </ul>
        </React.Fragment>
    }
}