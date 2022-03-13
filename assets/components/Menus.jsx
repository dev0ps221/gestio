class Menus extends React.Component{
    constructor(props){
        super(props)
        const {menus} = props 
        this.state = {
            menus
        }
        window.shopMenus = this
        this.listenShop()
    }  


    cleanState(){
        this.state.menus = this.state.menus ? this.state.menus : []
        return this.state
    }
    
    listenShop(){
        shop.whenReady(
            ()=>{
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
    

    renderMenu(menu,key){
        return  <Menu menu={menu} key={key}/>      
    }

    render(){
        const {menus} = this.state
        return <React.Fragment>
            {menus.map(
                this.renderMenu
            )}
        </React.Fragment>
    }

}