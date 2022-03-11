class Admin extends React.Component{


    constructor(props){
        super(props)
        window.adminPage = this
        this.state = {...props}
        this.state.menus = this.state.menus ? this.state.menus : new Array("Vous ne proposez aucun menu pour l'instant")
        if (!iLI()){
            document.location.href ='/login'
        }
    }

    render(){
        return <AdminFeed id='admin' menus={this.state.menus}>
            <AdminMenus key='adminmenus' id='adminmenus' menus={this.state.menus}/>
        </AdminFeed>
    }
}