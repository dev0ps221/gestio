class Menus extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menus:props.menus
        }
    }  
    

    renderMenu(menu,key){
        return  <Menu menu={menu} key={key}/>      
    }

    render(){
        return <React.Fragment>
            {this.state.menus.map(
                this.renderMenu
            )}
        </React.Fragment>
    }

}