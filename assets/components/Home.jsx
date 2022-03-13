class Home extends React.Component{

    constructor(props){
        super(props)
        window.homeComp = this
        this.listenShop()
    }

    state = {
        menus:new Array({nom:"Vous ne proposez aucun menu pour l'instant",articles:[]})
    }
    
    cleanState(){
        this.state.menus = this.state.menus ? this.state.menus : []
        return this.state
    }

    listenShop(){
        shop.whenReady(
            ()=>{
                console.log('shop ready')
                this.state.menus = shop.data.categories
                let state = this.cleanState()
                shop.sio.get(
                    'categoriesRes',(cats)=>{
                        this.state.menus = cats
                        state = this.cleanState()
                        this.setState(state)
                    }
                )
                this.setState(state)
                if(window.shopMenus){
                    window.shopMenus.state = state.menus
                    window.shopMenus.setState(state.menus)
                }
                if(document.body.querySelector('.TeeSplash')){
                    Splash.UnSplash()
                }
            }
        )
    }

    render(){
        return <HomeContainer menus={this.state.menus} />
    }

    
}