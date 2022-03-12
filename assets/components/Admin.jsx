class Admin extends React.Component{


    state = {
        menus:[],
        articles:[],
        commandes:[]
    }

    constructor(props){
        super(props)
        window.adminPage = this
        this.state = {...props}
        this.cleanState()
        if (!iLI()){
            document.location.href ='/login'
        }
        this.listenShop()
    }
    
    cleanState(){
        this.state.menus = this.state.menus ? this.state.menus : new Array({nom:"Vous ne proposez aucun menu pour l'instant"})
        this.state.articles = this.state.articles ? this.state.articles : new Array("Vous ne proposez aucun article pour l'instant")
        this.state.commandes = this.state.commandes ? this.state.commandes : new Array("Vous n'avez aucun commande pour l'instant")
        return this.state
    }

    listenShop(){
        shop.whenReady(
            ()=>{
                this.state.menus = shop.data.categories
                this.state.commandes = shop.data.commandes
                const state = this.cleanState()
                this.setState(state) 
                shop.sio.on(
                    'categoriesRes',(cats)=>{
                        console.log('categories ...',cats)
                    }
                )
            }
        )
    }

    render(){
        return <AdminFeed id='admin' menus={new Array(...this.state.menus)}>
            <AdminCommandes key='admincommandes' id='admincommandes' commandes={new Array(...this.state.commandes)}/>
            <AdminMenus key='adminmenus' id='adminmenus' menus={new Array(...this.state.menus)}/>
            <AdminArticles key='adminarticles' id='adminarticles' articles={new Array(...this.state.articles)}/>
        </AdminFeed>
    }
}