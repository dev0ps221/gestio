class Home extends React.Component{

    constructor(props){
        super(props)
        window.homeComp = this
        this.listenShop()
    }

    state = {
        menus:[
            {articles:[{content:'hi'}]}
        ]
    }
    
    listenShop(){
        shop.whenReady(
            ()=>{
                Splash.UnSplash()
            }
        )
    }

    render(){
        return <HomeContainer menus={this.state.menus} />
    }

    
}