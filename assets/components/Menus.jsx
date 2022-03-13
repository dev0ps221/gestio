class Menus extends React.Component{
    constructor(props){
        super(props)
        const {menus} = props 
        this.state = {
            menus
        }
        window.shopMenus = this
    }  
    

    renderMenu(menu,key){
        return  <Menu menu={menu} key={key}/>      
    }

    render(){

        console.log('these are our menus ',this.state.menus)
        return <React.Fragment>
            {this.state.menus.map(
                this.renderMenu
            )}
        </React.Fragment>
    }

}