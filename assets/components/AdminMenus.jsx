class AdminMenus extends React.Component{

    constructor(props){
        super(props)
        this.state = {...props}
    }

    renderMenus(){
        this.state.menus = adminPage.state.menus
        return <ul className="admin-menulist">
            {(()=>{return (this.state.menus ? this.state.menus : []).map(
                (m,k)=>{return this.renderMenu(m,k)}
            )})()}
        </ul>
    }
    
    renderMenu(menu,key){
        return <li key={key} className="menu">
            {menu.nom ? menu.nom.toString() : Object.keys(menu)[0]}
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