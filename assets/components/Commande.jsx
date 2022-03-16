class Commande extends React.Component{


    constructor(props){
        super(props)
        this.state = {...props}
        this.refreshCart()
        window.cart = this
    }

    refreshCart(){
        const action = ()=>{
            if(shop.getCart()){
                if(window.cart){
                    this.state = {...shop.getCart()}
                    this.setState(this.state)
                }
            }
        }
        shop.isReady() 
        ?
            action()
        :   
            shop.whenReady(
                ()=>action()
            )

    }


    renderArticle(article,key){
        return <li key={key} className="article-panier article">
            {article.nom}
            <ul className="infos-article">
                <li>
                    {article.quantite}
                </li>
                <li>
                    {article.prix}
                </li>
            </ul>
        </li>
    }


    renderArticles(){
        let rendered = ""
        if(shop && shop.cart && Array.isArray(shop.cart.articles)){
            rendered = shop.cart.articles.map(
                (a,k)=>this.renderArticle(a,k)
            )
        }
        return rendered 
    }


    render(){
        return <React.Fragment>
            <h1>MA COMMANDE</h1>
            <ul className="articles" id='articles-panier'>
                {this.renderArticles()}
            </ul>
        </React.Fragment>
    }


}