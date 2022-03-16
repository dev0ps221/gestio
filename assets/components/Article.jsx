class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
    }
    addToCart(e){
        e.target.src='/imgs/panier_green.png'
        shop.addCartProd(this.state.id,this.state.nom,1,this.state.prix)
        if(window.cart)window.cart.refreshCart()
        e.preventDefault()
        e.target.src='/imgs/panier.png'
    }
    render(){
        return <li className="article-menu" key={this.state.key}>
            <h1>
                {this.state.nom}                    
            </h1>
            <ul className='infos-article-menu'>
                <li className="illu">
                   <img src={this.state.illu}/>                    
                </li>
                <li>
                   {this.state.prix} FCFA                    
                </li>
            </ul>
            <ul className="actions-article-menu">
                <li className="action-article">
                    <img src='/imgs/panier_white.png' onClick={e=>this.addToCart(e)} onMouseOver={e=>e.target.src='/imgs/panier_greegreen.png'} onMouseOut={e=>e.target.src='/imgs/panier_white.png'}/>
                </li>
                {shop.hasInCart(this.state.id)
                    ?
                        <React.Fragment>
                            <li className="action-article">
                                <img src='/imgs/add.png' onClick={e=>this.shop.incrementCartUnit(this.state.id)}/>
                            </li>
                            <li className="action-article">
                                <img src='/imgs/remove.png' onClick={e=>this.shop.decrementCartUnit(this.state.id)}/>
                            </li>
                        </React.Fragment>
                    :''
                }
            </ul>
        </li>
    }
    
}
