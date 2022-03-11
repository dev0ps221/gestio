class Admin extends React.Component{


    constructor(props){
        super(props)
        window.adminPage = this
        this.state = {...props}
        this.state.menus = this.state.menus ? this.state.menus : new Array("Vous ne proposez aucun menu pour l'instant")
        this.state.articles = this.state.articles ? this.state.articles : new Array("Vous ne proposez aucun article pour l'instant")
        this.state.commandes = this.state.commandes ? this.state.commandes : new Array("Vous n'avez aucun commande pour l'instant")
        if (!iLI()){
            document.location.href ='/login'
        }
    }

    render(){
        return <AdminFeed id='admin' menus={this.state.menus}>
            <AdminCommandes key='admincommandes' id='admincommandes' commandes={this.state.commandes}/>
            <AdminMenus key='adminmenus' id='adminmenus' menus={this.state.menus}/>
            <AdminArticles key='adminarticles' id='adminarticles' articles={this.state.articles}/>
        </AdminFeed>
    }
}