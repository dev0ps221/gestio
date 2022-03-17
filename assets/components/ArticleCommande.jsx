class ArticleCommande extends React.Component{



    constructor(props){
        super(props)
        this.parent = this.props.parent
        this.state = props.article
        this.state.quantite = parseInt(this.state.quantite)
    }




    changeQuantity(oldq,newq,id){
        console.log(oldq,newq)
        this.state.quantite = newq
        this.setState(this.state)
        if(id && oldq!=newq){
            let articles = []
            shop.cart.articles.forEach(
                article=>{
                    if(article.id==id)article.quantite = newq
                    articles.push(article)                
                }
            )
            shop.cart.articles = articles
            shop.saveCart(shop.cart)
            this.parent.refreshCart()
        }
        console.log(this.state.quantite)
    }

    getQuantity(){
        return this.state.quantite
    }
    
    render(){
        const q = this.getQuantity()
        return <li key={this.key} className="article-commande article">
            <ul>
                {this.state.nom}
            </ul>
            <ul className="infos-article">
                <li>
                    <InputField type='number' value={q} onChange={e=>this.changeQuantity(this.state.quantite,e.target.value,this.state.id)} min={0} />
                </li>
                <li>
                    {this.state.prix} FCFA
                </li>
            </ul>
            <ul className="cout-article">
                <li>
                    {this.state.quantite * this.state.prix} FCFA
                </li>
            </ul>
        </li>
    }
}