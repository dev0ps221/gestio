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
        return <li key={key} className="article-commande article">
            <ul>
                {article.nom}
            </ul>
            <ul className="infos-article">
                <li>
                    <InputField type='number' value={article.quantite} onChange={e=>this.changeQuantity(article.quantite,e.target.value,article.id)} min={0} />
                </li>
                <li>
                    {article.prix} FCFA
                </li>
            </ul>
            <ul className="cout-article">
                <li>
                    {article.quantite * article.prix} FCFA
                </li>
            </ul>
        </li>
    }


    renderArticles(){
        let rendered = ''
        
        if(shop && shop.cart && Array.isArray(shop.cart.articles)){
            rendered = shop.cart.articles.map(
                (a,k)=><ArticleCommande article={a} key={k} parent={this}/>
            )
        }
        return rendered 
    }

    
    render(){
        return <React.Fragment>
            <h1>MA COMMANDE</h1>
            <ul className="articles" id='articles-commande'>
                <li className="article-commande article" key={'0-'}>
                    <ul>
                        nom
                    </ul>
                    <ul className="infos-article">
                        <li>
                            unites
                        </li>
                        <li>
                            prix
                        </li>
                    </ul>
                    <ul className="cout-article">
                        <li>
                            total
                        </li>
                    </ul>
                </li>
                {this.renderArticles()}
            </ul>
            <h1>VALIDER LA COMMANDE</h1>
            <ul className="valider" id='valider-commande'>
                <li className="client-commande infos" key={'0-'}>    
                    <button>
                        VALIDER !
                    </button>
                </li>
            </ul>
        </React.Fragment>
    }


}