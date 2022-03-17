class ActionsArticle extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.article
        this.state.shop = shop
    }
    addToCart(e){            
        if(shop.hasInCart(this.state.id)){
            shop.incrementCartUnit(this.state.id)
        }else{
            shop.addCartProd(this.state.id,this.state.nom,1,this.state.prix)
        }
        e.preventDefault()
        this.state.shop = shop
        this.setState(this.state)
        shopMenus.setState(shopMenus.state)
        if(window.cart)window.cart.refreshCart()
    }
    delFromCart(e){
        shop.decrementCartUnit(this.state.id)
        e.preventDefault()
        this.state.shop = shop
        this.setState(this.state)
        shopMenus.setState(shopMenus.state)
        if(window.cart)window.cart.refreshCart()
    }
    render(){
        return  <ul className="actions-article-menu">
            <li className="action-article">
                <img src='/imgs/add.png' onClick={e=>this.addToCart(e)}/>
            </li>
            {(shop.hasInCart(this.state.id)  !=null)
                ?   <li className="action-article">
                        <img src='/imgs/remove.png' onClick={e=>this.delFromCart(e)}/>
                    </li>
                :   ''
            }
        </ul>
    }
    
}
