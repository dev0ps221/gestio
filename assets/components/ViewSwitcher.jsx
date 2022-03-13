let firstturn = true
class ViewSwitcher extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tabs:props.tabs,
            onSwitch:props.onSwitch
        }
    }
 

    doSwitch(e){
        
        document.querySelector('#home .switcher-tabs .actual').classList.remove('actual')
        e.target.parentNode.classList.add('actual')
        this.state.onSwitch(e)
        
    }

    renderTab(tab,key){
        const rendered = <li id={`v_${tab}`} className={firstturn && tab=='menus'?'actual':''} onClick={(e)=>this.doSwitch(e)} key={key}>
            <h1>
                {tab}
            </h1>
        </li>
        firstturn = false
        return rendered
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