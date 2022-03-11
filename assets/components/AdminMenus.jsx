class AdminMenus extends React.Component{

    constructor(props){
        super(props)
        this.state = {...props}
    }

    renderMenus(){
        return <ul className="admin-menulist">
            {(this.state.menus ? this.state.menus : ["Vous ne proposez aucun menu pour l'instant"]).map(
                (m,k)=>this.renderMenu(m,k)
            )}
        </ul>
    }
    renderMenu(menu,key){
        return <li key={key} className="menu">
            {menu}
        </li>
    }

    render(){

        return <React.Fragment>
            <h1>
                Menus
            </h1>
            {this.renderMenus()}
        </React.Fragment>

        
    }

}