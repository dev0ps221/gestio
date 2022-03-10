class HomeContainer extends React.Component{
    constructor(props){
        super(props)
        this.state.menus = props.menus
    }
    state = {
        view:"menus"
    } 
    switchView(e){
        this.state.view = e.target.id.replace('v_','')
        this.setState(this.state)
    }
    render(){
        console.log(this.state.view)
        return <React.Fragment>
            <ViewSwitcher tabs={['menus','commandes']} onSwitch={(e)=>this.switchView(e)} />
            <ViewSwitch view={this.state.view}>
                {
                    this.state.view == 'menus'  
                        ?   
                            <Menus menus={this.state.menus} key='menus'/>
                        :
                            <CommandesClient key='commandes'/>
                }
            </ViewSwitch>
        </React.Fragment>
    }

}